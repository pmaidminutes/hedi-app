import { getUser } from "@/modules/auth/client";
import { Button, Body, Label } from "@/modules/components";
import { IPage } from "@/modules/page/types";
import { Row, Column } from "carbon-components-react";
import { useRouter } from "next/router";
import React from "react";
import { transformProfileTestLandingPage } from "./transformProfileTestLandingPage";

export const ProfileTestLandingPageView = ({ content }: { content: IPage }) => {
  const [user] = getUser();
  const {
    body,
    loginLabel,
    loginButton,
    loginHref,
    registerLabel,
    registerButton,
    registerHref,
    editProfileButton,
    editProfileHref,
  } = transformProfileTestLandingPage(content);
  const router = useRouter();
  return (
    <>
      <div className="hedi--titlegroup bx--col">
        <Row>{body && <Body {...body} />}</Row>
      </div>
      <Row>
        {user ? (
          <Column>
            {editProfileButton && (
              <Button
                {...editProfileButton}
                onClick={() => router.push(editProfileHref || "/")}
              />
            )}
          </Column>
        ) : (
          <>
            <Column lg={{ span: 5 }} md={4} sm={2}>
              <div>
                {registerLabel && (
                  <Label className="bx--label" {...registerLabel} />
                )}
              </div>
              {registerButton && (
                <Button
                  {...registerButton}
                  onClick={() => router.push(registerHref || "/")}
                />
              )}
            </Column>
            <Column lg={{ span: 5, offset: 1 }} md={4} sm={2}>
              <div>
                {loginLabel && <Label className="bx--label" {...loginLabel} />}
              </div>
              {loginButton && (
                <Button
                  {...loginButton}
                  onClick={() => router.push(loginHref || "/")}
                />
              )}
            </Column>
          </>
        )}
      </Row>
    </>
  );
};
