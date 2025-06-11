import { CatalogItemsPage } from "@/components/catalog-items-page";

export default function Home() {
  return (
    <div className="min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <CatalogItemsPage />
      </main>
    </div>
  );
}
