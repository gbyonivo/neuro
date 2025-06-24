"use client";

import { CatalogItemsPage } from "@/components/catalog-items-page";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("Home");
  }, []);
  return (
    <div className="min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <CatalogItemsPage />
      </main>
    </div>
  );
}
