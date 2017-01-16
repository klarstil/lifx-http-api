export type LifxSelector = 'all' | string;

export interface ILifxState {
  power?: 'on' | 'off';
  color?: string;
  brightness?: number;
  duration?: number;
  infrared?: number;
}
export interface ILifxBreatheState {
  /** The color to use for the breathe effect. */
  color?: string;
  /** The color to start the effect from. If this parameter is omitted then the color the bulb is currently set to is used instead. */
  from_color?: string;
  /** The time in seconds for one cyles of the effect. */
  period?: number;
  /** The number of times to repeat the effect. */
  cycles?: number;
  /** If false set the light back to its previous value when effect ends, if true leave the last effect color. */
  persist?: boolean;
  /** If true, turn the bulb on if it is not already on. */
  power_on?: boolean;
  /** Defines where in a period the target color is at its maximum. Minimum `0.0`, maximum `1.0`. */
  peak?: number;
}
export interface ILifxPulseState {
  /** The color to use for the breathe effect. */
  color?: string;
  /** The color to start the effect from. If this parameter is omitted then the color the bulb is currently set to is used instead. */
  from_color?: string;
  /** The time in seconds for one cyles of the effect. */
  period?: number;
  /** The number of times to repeat the effect. */
  cycles?: number;
  /** If false set the light back to its previous value when effect ends, if true leave the last effect color. */
  persist?: boolean;
  /** If true, turn the bulb on if it is not already on. */
  power_on?: boolean;
}
export interface ILifxCycleState {
  /** Array of state hashes as per Set State. Must have 2 to 5 entries. */
  states: ILifxState[];
  /** Default values to use when not specified in each states[] object. */
  defaults?: ILifxState;
  /** Direction in which to cycle through the list. Can be `forward` or `backward` */
  direction?: 'forward' | 'backward';
}

export interface ILifxClient {
  // constructor (options: ILifxOptions);

  /** Gets lights belonging to the authenticated account. Filter the lights using selectors. */
  listLights (selector: LifxSelector, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Sets the state of the lights within the selector. */
  setState (selector: LifxSelector, settings: ILifxState, callback?: (err: Error, data: any) => void): Promise<any>;
  /** This endpoint allows you to set different states on multiple selectors in a single request. */
  setStates (settings: ILifxState, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Turn off lights if they are on, or turn them on if they are off. Physically powered off lights are ignored. */
  togglePower (selector: LifxSelector, duration: number, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Performs a breathe effect by slowly fading between the given colors. Use the parameters to tweak the effect. */
  breathe (selector: LifxSelector, settings?: ILifxBreatheState, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Performs a pulse effect by quickly flashing between the given colors. Use the parameters to tweak the effect. */
  pulse (selector: LifxSelector, settings: ILifxPulseState, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Make the light(s) cycle to the next or previous state in a list of states. */
  cycle (selector: LifxSelector, settings: ILifxCycleState, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Lists all the scenes available in the users account. */
  listScenes (callback?: (err: Error, data: any) => void): Promise<any>;
  /** Activates a scene from the users account. */
  activateScene (selector: LifxSelector, duration: number, callback?: (err: Error, data: any) => void): Promise<any>;
  /** This method lets you validate a user's color string and return the hue, saturation, brightness and kelvin values that the API will interpret as. */
  validateColor (color: string, callback?: (err: Error, data: any) => void): Promise<any>;
  /** Returns the api version. */
  getVersion (): string;
  /** Sets the api version. Returns true if the version was set sucessfully, otherwise false. */
  setVersion (version: string): boolean;
  /** Returns the api url. */
  getUrl (): string;
  /** Sets the api url. Returns true if the url was set sucessfully, otherwise false. */
  setUrl (url: string): boolean;
  /** Returns the full Lifx api endpoint. */
  getApiUrl (): string;
  /** Returns the bearer authentication token. */
  getBearerToken (): string;
  /** Sets the bearer authentication token. Returns true if the token was set sucessfully, otherwise false. */
  setBearerToken (token: string): boolean;
  /** Sends a request to the Lifx API. */
  send (settings: any, callback?: (err: Error, data: any) => void): Promise<any>;
}

export interface ILifxOptions {
  bearerToken: string;
  version?: string;
  url?: string;
}
