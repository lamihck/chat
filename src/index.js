import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";

import { Main } from "./Components/Main.component.js";

import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Store/Store.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },{
    path: "/chat",
    element: <Main/>,
  },
]);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
