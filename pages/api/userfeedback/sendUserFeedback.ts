import { sendUserFeedbackAPI } from "@/modules/userFeedback/server/sendUserFeedbackAPI";
import { NextApiHandler } from "next";

const SendUserFeedback: NextApiHandler<any> = sendUserFeedbackAPI;
export default SendUserFeedback;
