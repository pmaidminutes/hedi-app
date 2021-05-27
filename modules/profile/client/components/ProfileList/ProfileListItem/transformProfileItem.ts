export function transformProfileItem(props: any) {
  const { profile } = props;
  const { route } = profile;

  const midwifeLabel = "Hebamme";
  const servicesHeadline = "Tätigkeiten";

  const profileType = "hedi--profile-list__item--midwife";

  return {
    midwifeLabel,
    servicesHeadline,
    route,
    profile,
    profileType,
  };
}
