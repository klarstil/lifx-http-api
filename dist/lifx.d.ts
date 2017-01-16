declare module 'lifx-http-api' {
  interface ILifxOptions {
    bearerToken: string;
  }

  const LifxHTTPAPI: (options: ILifxOptions) => void;
  export = LifxHTTPAPI;
}
