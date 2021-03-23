export interface IRelatedProfile {
  longtitle: string;
  description: string;
  city: string;
  route: string;
}
export function useRelatedProfile(props: IRelatedProfile) {
  const { longtitle, description, city, route } = props;
  return { longtitle, description, city, route };
}
