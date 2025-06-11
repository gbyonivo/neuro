"use client";

import StoreProvider from "@/context/store";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return <StoreProvider>{children}</StoreProvider>;
}
