import Image from "next/image";
import { getUser } from "@/modules/auth/client";
import { HTMLWithNextImage } from "@/modules/react/html";
import { extractConfig, IEditProfileView } from "../../types";
import { EditProfileForm, useEditProfileForm } from "../EditProfileForm";

export const EditProfile = ({ content }: { content: IEditProfileView }) => {
  const [user] = getUser();
  if (!user) return null; //TODO senseful redirect
  const poster = content.posterImage;

  return (
    <>
      {!!poster && (
        <Image
          src={poster.route}
          width={poster.width}
          height={poster.height}
          title={poster.label}
          alt={poster.alt}
        />
      )}
      <h1>{content.longTitle ?? content.label}</h1>
      <HTMLWithNextImage data={content.body} />
      <EditProfileForm
        className="hedi--edit-profile"
        config={extractConfig(content)}
        {...useEditProfileForm(content.lang)}
      />
    </>
  );
};
