# Persist Redux Slice

Automatically persist a redux slice in localStorage.

```javascript
// store.js

import { configureStore } from "@reduxjs/toolkit";

import { 
  persist, 
  persistenceMiddleware, 
  LoadSlicesFromLocalStorage 
} from "persist-redux-slice";

import mySlice from "./mySlice";

export const store = configureStore({
  reducer: {
    mySlice: persist({ mySlice }),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistenceMiddleware);
  },
});

store.dispatch(LoadSlicesFromLocalStorage);
```

```javascript
// mySlice.js

const mySlice = createSlice({
  name: "mySlice",
  initialState: { },
  reducers: { },
});

export default mySlice.reducer;
```
##  Options
`persist` can take a second `options` object.
* `msDebounce`: Slices are written to localStorage after a period of inactivity, to prevent rapid subsequent writes. Defaults to 250ms.
* `storageKey`: A unique key in localStorage. Defaults to the name of the slice concatenated with a hash.

```javascript
persist({ mySlice }, { msDebounce: 1500, storageKey: "my-unique-key" });
```

## Reducer Name

In `persist`'s first object, **the key should be a slice's name**, and the value is its reducer.

For example, consider a slice named "counter":

```javascript
// slices/counterSlice.js

const counterSlice = createSlice({
  name: "counter", // <--------- slice name is "counter"
  initialState: {},
  reducers: {},
});

export default counterSlice.reducer;
```

It's easiest to *import a reducer by its name*:
```javascript
// store.js

import counter from "./slices/counterSlice.js";
//       ↑
// (same as slice name)

export const store = configureStore({
  reducer: {
    counter: persist({ counter }),
  },
  // ...
});
```

But you can also import a reducer by a different name:

```javascript
// store.js

import counterReducer from "./slices/counterSlice.js";

export const store = configureStore({
  reducer: {
    // specify slice name ↓
    counter: persist({ counter: counterReducer }),
  },
  // ...
});
```