export function clientInformationCollector(): object {
  const clientInfo: { [key: string]: any } = {
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    languages: window.navigator.languages.join(","),
    platform: window.navigator.platform,
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
  };
  // TODO: get more information
  return clientInfo;
}
