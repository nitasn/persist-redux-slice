import { SingleKeyRecord } from "./SingleKeyRecord";


const storageSetters = {};

interface Options {
  storageKey?: string;
  msDebounce?: number;
}

type Persist = <K extends string>(namedReducer: SingleKeyRecord<K, any>, options?: Options) => any;

export const persist: Persist = (namedReducer, { storageKey = undefined, msDebounce = 1000 } = {}) => {
  const [[sliceName, reducer]] = Object.entries(namedReducer);

  storageKey ??= sliceName; // default storageKey is sliceName

  storageSetters[sliceName] = debouncify({ ms: msDebounce }, (slice) => {
    localStorage.setItem(storageKey, JSON.stringify(slice));
  });

  return (slice, action) => {
    if (action.type === LoadSlicesFromLocalStorage.type) {
      const storage = localStorage.getItem(storageKey);
      return storage !== null ? JSON.parse(storage) : slice;
    }
    return reducer(slice, action);
  };
}

export const persistanceMiddleware: any = (store) => (next) => (action) => {
  const ret = next(action);

  const [sliceName] = action.type.split("/");

  if (sliceName in storageSetters) {
    const slice = store.getState()[sliceName];
    storageSetters[sliceName](slice);
  }

  return ret;
};

/**
 * reduce subsequent calls into one call, performed after `ms` of inactivity.
 */
function debouncify({ ms }, callback) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, ms, ...args);
  };
}

export const LoadSlicesFromLocalStorage = Object.freeze({ type: "LoadSlicesFromLocalStorage" });
