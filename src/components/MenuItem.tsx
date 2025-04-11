import React from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

// Define the category type to match the values used in MenuItemSchema
type MenuItemCategory =
  | "Hlavní jídla"
  | "Předkrmy"
  | "Polévky"
  | "Dezerty"
  | "Nápoje"
  | "Alkoholické nápoje";

// Define interface for the menu item
interface MenuItemData {
  id: string;
  name: string;
  price: number;
  category: MenuItemCategory;
  description?: string;
  isActive?: boolean;
}

// Define props interface for the component
interface MenuItemProps {
  item: MenuItemData;
}

export default function MenuItem({ item }: MenuItemProps): JSX.Element {
  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Opravdu chcete odstranit tuto položku?")) {
      try {
        // Zde by byl API call pro odstranění položky
        // await fetch(`/api/menu/${item.id}`, { method: 'DELETE' });
        alert("Položka byla odstraněna");
        // Refresh stránky nebo aktualizace stavu
      } catch (error) {
        console.error("Chyba při odstraňování položky:", error);
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-gray-600 text-sm">{item.category}</p>
          <p className="text-xl font-bold mt-2">{item.price} Kč</p>
        </div>
        <div className="flex">
          <Link
            href={`/menu/${item.id}`}
            className="text-blue-500 hover:text-blue-700 mr-2"
          >
            <FaEdit />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
