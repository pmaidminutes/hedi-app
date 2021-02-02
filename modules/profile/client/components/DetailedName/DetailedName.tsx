import { IDetailedName } from "@/modules/model";

interface IDetailedNameProps {
  content: IDetailedName;
}

export const DetailedName = ({ content }: IDetailedNameProps): JSX.Element => {
  const { display, name, surname, suffix, prefix } = content;
  return (
    <section>
      <h3>{name}</h3>
      <h3>{display}</h3>
      <p>{`${prefix ? `${prefix} ` : null}${name} ${surname}${
        suffix ? ` ${suffix}` : null
      }`}</p>
    </section>
  );
};
