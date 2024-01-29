import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  AppStateProvider,
  globalReducers,
  initialState,
} from "@store/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppStateProvider reducer={globalReducers} initialState={initialState}>
        <App />
      </AppStateProvider>
    </ChakraProvider>
  </React.StrictMode>
);
