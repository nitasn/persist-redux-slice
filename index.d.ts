import { SingleKeyRecord } from "./SingleKeyRecord";

export interface Options {
  storageKey?: string;
  msDebounce?: number;
}

/**
 * Automatically persist a redux slice in localStorage.
 * 
 * ## Usage
 * ```
 * export const store = configureStore({
 *   reducer: {
 *     mySlice: persist({ mySlice }),
 *   },
 *   middleware: (getDefaultMiddleware) => {
 *     return getDefaultMiddleware().concat(persistanceMiddleware);
 *   },
 * });
 * 
 * store.dispatch(LoadSlicesFromLocalStorage);
 * ```
 * ## Arguments
 * 
 * @param namedReducer - An object. **Key** - slice's regisrered name, **Value** - slice's reducer.
 * @param options - An (optional) object with keys `msDebounce` (defaults to 250), and/or `storageKey` (defaults to the slice name concatenated with a hash).
 * 
 * See [NPM Page](https://www.npmjs.com/package/persist-redux-slice) for more info.
 */
export const persist: <K extends string>(namedReducer: SingleKeyRecord<K, any>, options?: Options) => any;

/**
 * See the docs for `persist`.
 */
export const persistenceMiddleware: any;

/**
 * See the docs for `persist`.
 */
export const LoadSlicesFromLocalStorage: { type: "LoadSlicesFromLocalStorage" };