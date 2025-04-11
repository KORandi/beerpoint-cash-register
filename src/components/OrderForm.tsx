import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import OrderItem from "./OrderItem";

// Define interfaces for the component's data structures
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

interface OrderItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  id?: string;
  table: string;
  items: OrderItemType[];
  notes: string;
  status?: string;
  createdAt?: string;
  totalPrice?: number;
}

interface OrderFormProps {
  initialData?: OrderData | null;
}

export default function OrderForm({
  initialData = null,
}: OrderFormProps): JSX.Element {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<OrderData>({
    table: "",
    items: [],
    notes: "",
  });
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    // Načtení položek menu
    const fetchMenuItems = async (): Promise<void> => {
      // V produkci by toto byl API call
      // const response = await fetch('/api/menu');
      // const data = await response.json();
      // setMenuItems(data);

      // Simulovaná data pro ukázku
      setMenuItems([
        { id: "1", name: "Smažený sýr", price: 129, category: "Hlavní jídla" },
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
    };

    // Nastavení počátečních dat, pokud existují
    if (initialData) {
      setOrder(initialData);
    }

    fetchMenuItems();
  }, [initialData]);

  const addItemToOrder = (): void => {
    if (!selectedItem) return;

    const menuItem = menuItems.find((item) => item.id === selectedItem);
    if (!menuItem) return;

    const existingItemIndex = order.items.findIndex(
      (item) => item.id === menuItem.id
    );

    if (existingItemIndex !== -1) {
      // Aktualizovat existující položku
      const updatedItems = [...order.items];
      updatedItems[existingItemIndex].quantity += quantity;
      setOrder({ ...order, items: updatedItems });
    } else {
      // Přidat novou položku
      setOrder({
        ...order,
        items: [
          ...order.items,
          {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantity,
          },
        ],
      });
    }

    // Reset výběru
    setSelectedItem("");
    setQuantity(1);
  };

  const removeItemFromOrder = (itemId: string): void => {
    setOrder({
      ...order,
      items: order.items.filter((item) => item.id !== itemId),
    });
  };

  const calculateTotal = (): number => {
    return order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!order.table) {
      alert("Vyberte prosím stůl");
      return;
    }

    if (order.items.length === 0) {
      alert("Přidejte alespoň jednu položku do objednávky");
      return;
    }

    try {
      // V produkci by toto byl API call
      // const method = initialData ? 'PUT' : 'POST';
      // const url = initialData ? `/api/orders/${initialData.id}` : '/api/orders';

      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...order,
      //     totalPrice: calculateTotal(),
      //     status: initialData?.status || 'active',
      //     createdAt: initialData?.createdAt || new Date().toISOString()
      //   })
      // });

      // if (response.ok) {
      //   router.push('/orders');
      // }

      // Simulace úspěšného vytvoření/aktualizace
      console.log(
        initialData ? "Objednávka aktualizována:" : "Objednávka vytvořena:",
        {
          ...order,
          totalPrice: calculateTotal(),
          status: initialData?.status || "active",
          createdAt: initialData?.createdAt || new Date().toISOString(),
        }
      );

      alert(
        initialData
          ? "Objednávka byla úspěšně aktualizována"
          : "Objednávka byla úspěšně vytvořena"
      );
      router.push("/orders");
    } catch (error) {
      console.error("Chyba při zpracování objednávky:", error);
    }
  };

  if (isLoading) {
    return <p>Načítání...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Detaily objednávky</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="table"
          >
            Stůl
          </label>
          <select
            id="table"
            value={order.table}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setOrder({ ...order, table: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Vyberte stůl</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num.toString()}>
                Stůl {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="notes"
          >
            Poznámka (volitelné)
          </label>
          <textarea
            id="notes"
            value={order.notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setOrder({ ...order, notes: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={2}
          ></textarea>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-bold mb-2">Přidat položku</h3>

          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-2 mb-2 md:mb-0">
              <select
                value={selectedItem}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedItem(e.target.value)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Vyberte položku</option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.price} Kč
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-1/4 md:px-2 mb-2 md:mb-0">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setQuantity(parseInt(e.target.value) || 1)
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="w-full md:w-1/4 md:pl-2">
              <button
                type="button"
                onClick={addItemToOrder}
                disabled={!selectedItem}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                Přidat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Shrnutí objednávky</h2>

        {order.items.length === 0 ? (
          <p className="text-gray-500 italic">Žádné položky v objednávce</p>
        ) : (
          <>
            <div className="overflow-y-auto max-h-64 mb-4">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Položka</th>
                    <th className="py-2 px-3 text-right">Cena</th>
                    <th className="py-2 px-3 text-right">Počet</th>
                    <th className="py-2 px-3 text-right">Celkem</th>
                    <th className="py-2 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <OrderItem
                      key={item.id}
                      item={item}
                      onRemove={removeItemFromOrder}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Celkem:</span>
                <span>{calculateTotal()} Kč</span>
              </div>
            </div>
          </>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={order.items.length === 0 || !order.table}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {initialData ? "Aktualizovat objednávku" : "Vytvořit objednávku"}
          </button>
        </div>
      </div>
    </div>
  );
}
