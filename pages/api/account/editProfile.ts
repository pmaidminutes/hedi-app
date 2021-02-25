
import { NextApiHandler } from "next";
import { getUserAuthHeader } from "@/modules/auth/server";
import { getClient, GQLEndpoint } from "@/modules/graphql";
import { EditProfileAPI } from "@/modules/EditProfile/server";

 const EditProfile: NextApiHandler<any> = async (req, res) => {
  await  EditProfileAPI(req, res);   
 }
export default EditProfile;
