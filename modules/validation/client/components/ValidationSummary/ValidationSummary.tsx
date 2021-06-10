import { ErrorMap } from "@/modules/model";

export const ValidationSummary = ({
  validationErrors,
}: {
  validationErrors: ErrorMap;
  }) => {
  console.log({validationErrors})
  return (
    <div className="">
      <ul>
        {Object.keys(validationErrors).map(item => (
          <li key={item}>{validationErrors[item]}</li>
        ))}
      </ul>
    </div>
  );
};