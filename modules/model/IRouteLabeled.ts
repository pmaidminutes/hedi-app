export interface IRouteLabeled {
  routelabel: string;
}

export const implementsIRouteLabeled = (obj: any) => !!(obj && obj.routelabel);

// UNUSED
export function isIRouteLabeled(obj: any): obj is IRouteLabeled {
  return implementsIRouteLabeled(obj);
}

export const RouteLabelFields = `routelabel`;
