import { getUser } from "@/modules/auth/client";
import { Button, Body, Label } from "@/modules/components";
import { IPage } from "@/modules/page/types";
import { Row, Column } from "carbon-components-react";
import { useRouter } from "next/router";
import React from "react";
import { transformLandingPage } from "./transformLandingPage";

export const LandingPageView = ({ content }: { content: IPage }) => {
  const [user] = getUser();
  const {
    body,
    aboveLogin,
    login,
    loginHref,
    aboveRegister,
    register,
    registerHref,
    editProfile,
    editProfileHref,
  } = transformLandingPage(content);
  const router = useRouter();
  return (
    <>
      <div className="hedi--titlegroup bx--col">
        <Row>{body && <Body {...body} />}</Row>
      </div>
      <Row>
        {user ? (
          <Column>
            {editProfile && (
              <Button
                {...editProfile}
                onClick={() => router.push(editProfileHref || "/")}
              />
            )}
          </Column>
        ) : (
          <>
            <Column lg={{ span: 5 }} md={4} sm={2}>
              <div>
                {aboveRegister && (
                  <Label className="bx--label" {...aboveRegister} />
                )}
              </div>
              {register && (
                <Button
                  {...register}
                  onClick={() => router.push(registerHref || "/")}
                />
              )}
            </Column>
            <Column lg={{ span: 5, offset: 1 }} md={4} sm={2}>
              <div>
                {aboveLogin && <Label className="bx--label" {...aboveLogin} />}
              </div>
              {login && (
                <Button
                  {...login}
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
