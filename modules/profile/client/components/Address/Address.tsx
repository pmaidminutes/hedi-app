import { IAddress } from "@/modules/model";
interface IAddressProps {
  content: IAddress;
}

export const Address = ({ content }: IAddressProps): JSX.Element => {
  const { city, street, postal_code, house_number } = content;
  return (
    <section>
      <address>
        {street && house_number ? `${street} ${house_number}` : null}
        <br />
        {`${postal_code ? postal_code : null} ${city ? city : null}`}
      </address>
    </section>
  );
};
