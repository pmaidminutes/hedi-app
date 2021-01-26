interface IDetailedNameProps {
  detailednamedata: {
    label: string;
    display: string;
    name: string;
    surname: string;
    suffix: string;
    prefix: string;
  };
}

export const DetailedName = ({
  detailednamedata,
}: IDetailedNameProps): JSX.Element => {
  const { label, display, name, surname, suffix, prefix } = detailednamedata;
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
