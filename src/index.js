import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";

import { Main } from "./Components/Main.component.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
