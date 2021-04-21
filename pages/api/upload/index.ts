import { uploadAPI } from "@/modules/uploader/server/uploadAPI";

export default uploadAPI;

export const config = {
  api: {
    bodyParser: false,
  },
};
