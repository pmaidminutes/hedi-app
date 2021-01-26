interface IContactProps {
  contactdata: {
    phone: string;
    phone_private: string;
    mail: string;
    website: string;
    consultation_hours: string;
  };
}

export const Contact = ({ contactdata }: IContactProps): JSX.Element => {
  const {
    phone,
    phone_private,
    mail,
    website,
    consultation_hours,
  } = contactdata;
  return (
    <section>
      {phone ? <p>{phone}</p> : null}
      {phone_private ? <p>{phone_private}</p> : null}
      {mail ? <p>{mail}</p> : null}
      {website ? <p>{website}</p> : null}
      {consultation_hours ? <p>{consultation_hours}</p> : null}
    </section>
  );
};
