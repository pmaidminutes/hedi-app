import React from "react";

import { Translate24 } from "@carbon/icons-react";
import { AsideAction } from "../AsideAction";
import { Seperator } from "@/modules/common/components";
import { Link } from "@/modules/components/client";
import { transformAside, IAside } from "./transformAside";

export const Aside = (props: IAside) => {
  const { anchors, actions } = transformAside(props);
  const test = () => console.log("TEST");
  if (!anchors && !actions) return null;
  return (
    <aside className="hedi--article--aside">
      {anchors && (
        <div className="hedi--article--aside__anchors">
          {/* TODO get title from apppage or something */}
          <h2>Abschnitte</h2>
          {anchors.map((anchor, index) => (
            <Link key={anchor.kind + index} {...anchor} />
          ))}
        </div>
      )}
      {actions && anchors && <Seperator />}
      {actions && (
        <div className="hedi--article--aside__actions">
          {actions.map((action, index) => (
            <AsideAction
              key={action.description + index}
              handler={action.handler}
              description={action.description}
              icon={action.icon}
            />
          ))}

          <AsideAction
            handler={test}
            description="Sprache Wechseln"
            icon={Translate24}
          />
        </div>
      )}
    </aside>
  );
};
