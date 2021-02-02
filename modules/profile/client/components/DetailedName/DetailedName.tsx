import { IDetailedName } from "@/modules/model";

interface IDetailedNameProps {
  content: IDetailedName;
}

export const DetailedName = ({ content }: IDetailedNameProps): JSX.Element => {
  const { displayName, forename, surname, suffix, prefix } = content;
  return (
    <section>
      <h3>{forename}</h3>
      <h3>{displayName}</h3>
      <p>{`${prefix ? `${prefix} ` : null}${forename} ${surname}${
        suffix ? ` ${suffix}` : null
      }`}</p>
    </section>
  );
};
