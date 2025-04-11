import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import MenuItem from "../../components/MenuItem";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

// Define the category type to match the values used in MenuItemSchema
type MenuItemCategory =
  | "Hlavní jídla"
  | "Předkrmy"
  | "Polévky"
  | "Dezerty"
  | "Nápoje"
  | "Alkoholické nápoje";

// Define interface for MenuItem
interface MenuItemData {
  id: string;
  name: string;
  price: number;
  category: MenuItemCategory;
  description?: string;
  isActive?: boolean;
}

export default function MenuPage(): JSX.Element {
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // V produkci by toto byl API call pro získání položek menu
    const fetchMenuItems = async (): Promise<void> => {
      try {
        // const response = await fetch('/api/menu');
        // const data = await response.json();
        // setMenuItems(data);

        // Simulovaná data pro ukázku
        setMenuItems([
          {
            id: "1",
            name: "Smažený sýr",
            price: 129,
            category: "Hlavní jídla",
          },
          {
            id: "2",
            name: "Svíčková na smetaně",
            price: 189,
            category: "Hlavní jídla",
          },
          {
            id: "3",
            name: "Pilsner Urquell 0.5l",
            price: 55,
            category: "Nápoje",
          },
          { id: "4", name: "Coca-Cola 0.33l", price: 45, category: "Nápoje" },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání menu:", error);
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <Layout title="Menu | Hospodský systém">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu</h1>
        <Link
          href="/menu/add"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Přidat položku
        </Link>
      </div>

      {isLoading ? (
        <p>Načítání menu...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Layout>
  );
}
