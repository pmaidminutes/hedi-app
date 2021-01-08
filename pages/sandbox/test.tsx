import { HTML } from "@/common/html";

export default function Test() {
  const htmlstring = `plain text no tag
  <p><strong>tag nested in p</strong></p>
  <p>some text <mark>and nested content</mark> and some more</p>
  <h3>a headline <mark>!!</mark><h3>
  plaintext no problem`;

  return <HTML data={htmlstring} />;
}
