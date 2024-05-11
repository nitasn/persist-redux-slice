import { SingleKeyRecord } from "./SingleKeyRecord";

export interface Options {
  storageKey?: string;
  msDebounce?: number;
}

/**
 * Automatically persist a redux slice in localStorage.
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
 * ## Options
 * `persist` can take a second `options` object, with keys `msDebounce` (defaults to 1000), and `storageKey` (defaults to the name of the slice, concatenated with a hash).
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