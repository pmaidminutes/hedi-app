import { searchServer } from "@/modules/search/request/searchServer";
import { NextApiHandler } from "next";

const solrSearchHandler: NextApiHandler<any> = async (req, res) => {
  const {
    query: { lang, searchText, filter },
  } = req;
  const data = await searchServer(
    `${lang}`,
    `${searchText}`.split(" ").join(" || "),
    filter,
    true
  );
  res.send(data);
};
export default solrSearchHandler;
