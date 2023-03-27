import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";

import { Main } from "./Components/Main.component.js";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Store/Store.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Main />
    </PersistGate>
  </Provider>
);
