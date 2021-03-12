import { NextApiHandler } from "next";
import { editProfileAPI } from "@/modules/editProfile/server";

const EditProfile: NextApiHandler<any> = async (req, res) => {
  await editProfileAPI(req, res);
};
export default EditProfile;
