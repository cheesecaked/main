import React from "react";
import Bruh from "./components/layout";
import { DataProvider } from "./context/Provider";

export default function App () {
  return(
    <DataProvider>
    <Bruh/>
    </DataProvider>
  )
}