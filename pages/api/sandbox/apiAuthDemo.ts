import { NextApiRequest, NextApiResponse } from "next";
import { queryServiceAuthHeader } from "@/modules/auth/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  const pwd = req.query?.pwd;
  if (pwd && typeof pwd === "string") {
    const header = await queryServiceAuthHeader("admin", pwd);
    if (header) {
      // use this header to make authenticated api calls
    }
    // HACK: don't do this, this is just for demo purposes
    res.json(header);
  } else {
    res.json({ notice: "service not logged in" });
  }
};
