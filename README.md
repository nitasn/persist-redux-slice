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
    mySlice: persist({ mySlice }, { storageKey: "my-unique-key" }),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(persistanceMiddleware);
  },
});

store.dispatch(LoadSlicesFromLocalStorage);

```

##  Options
* `msDebounce`: Slices are written to localStorage after a period of inactivity, to prevent rapid subsequent writes. Defaults to 1000ms.
* `storageKey`: A unique key in localStorage. Defaults to the name of the slice.

```javascript
persist({ mySlice }, { storageKey: "my-unique-key", msDebounce: 1500 });

// defaults to { storageKey: "mySlice", msDebounce: 1000 }
persist({ mySlice });
```

## Installation
```bash
npm install persist-redux-slice
```

