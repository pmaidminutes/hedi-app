interface IDetailedNameProps {
  content: {
    label: string;
    display: string;
    name: string;
    surname: string;
    suffix: string;
    prefix: string;
  };
}

export const DetailedName = ({ content }: IDetailedNameProps): JSX.Element => {
  const { label, display, name, surname, suffix, prefix } = content;
  return (
    <section>
      <h3>{label}</h3>
      <h3>{display}</h3>
      <p>{`${prefix ? `${prefix} ` : null}${name} ${surname}${
        suffix ? ` ${suffix}` : null
      }`}</p>
    </section>
  );
};
