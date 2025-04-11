import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import MenuForm from "../../components/MenuForm";

// Define the category type to match the values used in MenuItemSchema
type MenuItemCategory =
  | "Hlavní jídla"
  | "Předkrmy"
  | "Polévky"
  | "Dezerty"
  | "Nápoje"
  | "Alkoholické nápoje";

// Define interface for MenuItem
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: MenuItemCategory;
  description: string;
  isActive?: boolean;
}

// Type for simulated database
interface MenuItemDatabase {
  [key: string]: MenuItem;
}

export default function EditMenuItem(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchMenuItem = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch(`/api/menu/${id}`);
        // const data = await response.json();
        // setMenuItem(data);

        // Simulovaná data pro ukázku
        const items: MenuItemDatabase = {
          "1": {
            id: "1",
            name: "Smažený sýr",
            price: 129,
            category: "Hlavní jídla",
            description: "Smažený sýr s hranolky a tatarskou omáčkou",
          },
          "2": {
            id: "2",
            name: "Svíčková na smetaně",
            price: 189,
            category: "Hlavní jídla",
            description:
              "Hovězí svíčková na smetaně s houskovým knedlíkem a brusinkami",
          },
          "3": {
            id: "3",
            name: "Pilsner Urquell 0.5l",
            price: 55,
            category: "Nápoje",
            description: "Točený Pilsner Urquell 0.5l",
          },
          "4": {
            id: "4",
            name: "Coca-Cola 0.33l",
            price: 45,
            category: "Nápoje",
            description: "Coca-Cola 0.33l v plechu",
          },
        };

        setMenuItem(items[id as string] || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání položky:", error);
        setIsLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (isLoading) {
    return (
      <Layout title="Načítání | Hospodský systém">
        <p>Načítání položky...</p>
      </Layout>
    );
  }

  if (!menuItem) {
    return (
      <Layout title="Položka nenalezena | Hospodský systém">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Položka nebyla nalezena!</p>
        </div>
        <button
          onClick={() => router.push("/menu")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zpět na seznam
        </button>
      </Layout>
    );
  }

  return (
    <Layout title="Upravit položku | Hospodský systém">
      <h1 className="text-2xl font-bold mb-6">Upravit položku menu</h1>
      <MenuForm initialData={menuItem} />
    </Layout>
  );
}
