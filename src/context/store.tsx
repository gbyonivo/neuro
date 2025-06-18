"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";

/**
 * I decided to use redux ahead of context api because i want to retain data from page to page
 * and also i want to use the data in the store in other components
 * and should in case i need to persist if a discussion is had and we notice new data is hardly added to the backend
 */

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
