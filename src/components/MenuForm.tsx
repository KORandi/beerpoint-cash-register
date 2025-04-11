import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

// Define the category type to match the values used in MenuItemSchema
type MenuItemCategory =
  | "Hlavní jídla"
  | "Předkrmy"
  | "Polévky"
  | "Dezerty"
  | "Nápoje"
  | "Alkoholické nápoje";

// Define interfaces for the component's data structures
interface MenuItem {
  id?: string;
  name: string;
  price: string | number;
  category: MenuItemCategory;
  description: string;
  isActive?: boolean;
}

interface MenuFormProps {
  initialData?: MenuItem | null;
}

export default function MenuForm({
  initialData = null,
}: MenuFormProps): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    price: "",
    category: "Hlavní jídla",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (initialData) {
        // Aktualizace existující položky
        // const response = await fetch(`/api/menu/${initialData.id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });

        // Simulujeme úspěšnou aktualizaci
        console.log("Aktualizována položka:", formData);
        alert("Položka byla úspěšně aktualizována");
      } else {
        // Přidání nové položky
        // const response = await fetch('/api/menu', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });

        // Simulujeme úspěšné přidání
        console.log("Přidána položka:", formData);
        alert("Položka byla úspěšně přidána");
      }

      router.push("/menu");
    } catch (error) {
      console.error("Chyba při ukládání položky:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow max-w-xl"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Název
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Cena (Kč)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="1"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Kategorie
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Hlavní jídla">Hlavní jídla</option>
          <option value="Předkrmy">Předkrmy</option>
          <option value="Polévky">Polévky</option>
          <option value="Dezerty">Dezerty</option>
          <option value="Nápoje">Nápoje</option>
          <option value="Alkoholické nápoje">Alkoholické nápoje</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Popis (volitelné)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Ukládání..."
            : initialData
            ? "Aktualizovat položku"
            : "Přidat položku"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="text-gray-600 hover:text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}
