export const Tag = ({ tagtext }: { tagtext: String }) => {
  return (
    <button className="bx--tag bx--tag--magenta">
      <a className="bx--tag__label hedi-unstyled-link" href="#">
        {tagtext}
      </a>
    </button>
  );
};
