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

##  Options
`persist` can take a second `options` object.
* `msDebounce`: Slices are written to localStorage after a period of inactivity, to prevent rapid subsequent writes. Defaults to 1000ms.
* `storageKey`: A unique key in localStorage. Defaults to the name of the slice concatenated with a hash.

```javascript
persist({ mySlice }, { msDebounce: 1500, storageKey: "my-unique-key" });
```

## Reducer Name

`persist` expects its first object's key to be the reducer name. In the above code, the reducer was imported by its name, as registered in the slice.

**For Example** - Say you name a reducer "cssVars":

```javascript
// slices/cssVars.js

const cssVars = createSlice({
  name: "cssVars", // <------------- reducer's name is "cssVars"
  initialState: {},
  reducers: {
    // ...
  },
});

export default cssVars.reducer;
```

It's easier to *import a reducer by its name*:
```javascript
// store.js

import cssVars from "./slices/cssVars.js"; // <-- imported as "cssVars"

export const store = configureStore({
  reducer: {
    cssVars: persist({ cssVars }),
  },
  // ...
});
```

But you can also import a reducer by a different name:

```javascript
// store.js

import cv from "./slices/cssVars.js"; // <-- imported as "cv"

export const store = configureStore({
  reducer: {
    // the reducer's name ↓
    cssVars: persist({ cssVars: cv }),
  },
  // ...
});
```