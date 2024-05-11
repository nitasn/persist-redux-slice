# Persist Redux Slice

Automatically persist a redux slice in localStorage.

```javascript
// store.js

import { configureStore } from "@reduxjs/toolkit";

import { 
  persist, 
  persistanceMiddleware, 
  LoadSlicesFromLocalStorage 
} from "persist-redux-slice";

import mySlice from "./mySlice";

export const store = configureStore({
  reducer: {
    mySlice: persist({ mySlice }),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistanceMiddleware);
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

## Installation
```bash
npm install persist-redux-slice
```

