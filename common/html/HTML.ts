import { Parser } from "htmlparser2";
import { createElement, HTMLAttributes } from "react";
import { IParserElementInfo, ITransformCallbackMap } from "./types";
import { attributesToProps } from "./utils";

export const HTML = ({
  data,
  callbacks,
}: {
  data: string;
  callbacks?: ITransformCallbackMap;
}) => {
  const root: IParserElementInfo = {
    name: "root",
    start: 0,
    end: data.length + 1,
    children: [],
    transform: (html, i) =>
      i.children.map(info =>
        info.transform(html, info, attributesToProps(info.attributes))
      ),
  };
  const stack = [root];
  const parser = new Parser({
    onopentag(name, attributes) {
      stack.unshift({
        name,
        start: parser.startIndex,
        end: -1,
        children: [],
        transform: (html, info, props) => defaultTransform(html, info, props),
        attributes,
      });
    },
    ontext(text) {
      stack[0].children.push({
        name: "innerText",
        start: parser.startIndex,
        end: parser.endIndex ? parser.endIndex + 1 : -1,
        children: [],
        transform: () => text,
      });
    },
    onclosetag(name) {
      const parserInfo = stack.shift();

      if (parserInfo) {
        if (parserInfo.name !== name) throw Error(name + " tag not closed");

        parserInfo.end = parser.endIndex ? parser.endIndex + 1 : -1;

        if (callbacks && callbacks[parserInfo.name]) {
          parserInfo.transform = callbacks[parserInfo.name];
          parserInfo.needsTransform = true;
        }

        if (parserInfo.needsTransform) stack[0].needsTransform = true;

        stack[0].children.push(parserInfo);
      }
    },
  });
  parser.write(data);
  parser.end();
  return root.transform(data, root) as JSX.Element;
};

export const defaultTransform = (
  htmlString: string,
  parseInfo: IParserElementInfo,
  props?: HTMLAttributes<any>
) => {
  if (
    parseInfo.needsTransform ||
    parseInfo.name === "br" ||
    parseInfo.name === "innerText"
  ) {
    const children =
      parseInfo.children.length === 0
        ? undefined
        : parseInfo.children.map(info =>
            info.transform(htmlString, info, attributesToProps(info.attributes))
          );
    return createElement(
      parseInfo.name,
      { key: parseInfo.name + parseInfo.start, ...props },
      children
    );
  } else {
    if (props && parseInfo.children.length > 0) {
      const start = parseInfo.children[0].start;
      const end = parseInfo.children[parseInfo.children.length - 1].end;
      props.dangerouslySetInnerHTML = {
        __html: htmlString.substring(start, end),
      };
    }

    return createElement(parseInfo.name, {
      key: parseInfo.name + parseInfo.start,
      ...props,
    });
  }
};
