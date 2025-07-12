"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistedStore, store } from "../redux";
import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "./Loader";
import { SessionProvider } from "next-auth/react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistedStore}>
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
