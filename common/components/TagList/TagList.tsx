import { Tag } from "../Tag";
export const TagList = ({ tags }: { tags: String[] }) => {
  return (
    <div className="bx--grid mb-l-sm">
      <h3 className="mt-s-md">Browse by tags</h3>
      <div className="bx--row mt-s-sm">
        <div className="bx--col-sm-4 bx--col-md-6 bx--col-lg-10">
          {tags.map((tag, index) => (
            <Tag tagtext={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
