import { uniqueKey } from "./unique-key";

const storageSetters = {};


export const persist = (namedReducer, { storageKey = undefined, msDebounce = 250 } = {}) => {
  const [[sliceName, reducer]] = Object.entries(namedReducer);

  storageKey ??= uniqueKey(sliceName);

  storageSetters[sliceName] = debouncify({ ms: msDebounce }, (slice) => {
    localStorage.setItem(storageKey, JSON.stringify(slice));
  });

  return (slice, action) => {
    if (action.type === LoadSlicesFromLocalStorage.type) {
      const storage = localStorage.getItem(storageKey);
      return storage != null ? JSON.parse(storage) : slice;
    }
    return reducer(slice, action);
  };
}

export const persistenceMiddleware = (store) => (next) => (action) => {
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
