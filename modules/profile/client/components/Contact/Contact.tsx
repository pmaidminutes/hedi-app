import { IContact } from "@/modules/model";

interface IContactProps {
  content: IContact;
}

export const Contact = ({ content }: IContactProps): JSX.Element => {
  const { phone, phone_private, mail, website, consultation_hours } = content;
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
