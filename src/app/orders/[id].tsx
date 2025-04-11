import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import OrderForm from "../../components/OrderForm";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

// Define interfaces for the data structure
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type OrderStatus = "active" | "completed" | "cancelled";

interface Order {
  id: string;
  table: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  notes: string;
  createdAt: string;
  paymentMethod?: string;
  paidAt?: string;
}

// Type for simulated database
interface OrderDatabase {
  [key: string]: Order;
}

export default function OrderDetail(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch(`/api/orders/${id}`);
        // const data = await response.json();
        // setOrder(data);

        // Simulovaná data pro ukázku
        const orders: OrderDatabase = {
          "1": {
            id: "1",
            table: "3",
            status: "active",
            items: [
              { id: "1", name: "Smažený sýr", price: 129, quantity: 2 },
              { id: "3", name: "Pilsner Urquell 0.5l", price: 55, quantity: 3 },
            ],
            totalPrice: 423,
            notes: "",
            createdAt: new Date().toISOString(),
          },
          "2": {
            id: "2",
            table: "7",
            status: "active",
            items: [
              { id: "2", name: "Svíčková na smetaně", price: 189, quantity: 1 },
              { id: "4", name: "Coca-Cola 0.33l", price: 45, quantity: 1 },
            ],
            totalPrice: 234,
            notes: "Bez knedlíků, extra brusinky",
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        };

        setOrder(orders[id as string] || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání objednávky:", error);
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCompleteOrder = async (): Promise<void> => {
    try {
      // V produkci by toto byl API call
      // const response = await fetch(`/api/orders/${id}/complete`, {
      //   method: 'POST'
      // });

      // if (response.ok) {
      //   router.push('/orders');
      // }

      // Simulace úspěšného dokončení
      alert("Objednávka byla úspěšně dokončena");
      router.push("/orders");
    } catch (error) {
      console.error("Chyba při dokončování objednávky:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Načítání | Hospodský systém">
        <p>Načítání objednávky...</p>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout title="Objednávka nenalezena | Hospodský systém">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>Objednávka nebyla nalezena!</p>
        </div>
        <button
          onClick={() => router.push("/orders")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zpět na seznam
        </button>
      </Layout>
    );
  }

  if (isEditMode) {
    return (
      <Layout title="Upravit objednávku | Hospodský systém">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Upravit objednávku #{order.id}</h1>
          <button
            onClick={() => setIsEditMode(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Zrušit úpravy
          </button>
        </div>
        <OrderForm initialData={order} />
      </Layout>
    );
  }

  return (
    <Layout title="Detail objednávky | Hospodský systém">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Objednávka #{order.id}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditMode(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Upravit
          </button>
          {order.status === "active" && (
            <button
              onClick={handleCompleteOrder}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Dokončit
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Detaily objednávky</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Stůl:</span>
                <span>Stůl {order.table}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Vytvořeno:</span>
                <span>
                  {format(new Date(order.createdAt), "dd.MM.yyyy HH:mm", {
                    locale: cs,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span
                  className={`${
                    order.status === "active"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {order.status === "active" ? "Aktivní" : "Dokončená"}
                </span>
              </div>
              {order.notes && (
                <div className="mt-4">
                  <p className="font-medium">Poznámka:</p>
                  <p className="bg-gray-100 p-2 mt-1 rounded">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Položky</h2>
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Položka</th>
                  <th className="py-2 px-3 text-right">Cena</th>
                  <th className="py-2 px-3 text-right">Počet</th>
                  <th className="py-2 px-3 text-right">Celkem</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3 text-right">{item.price} Kč</td>
                    <td className="py-2 px-3 text-right">{item.quantity}</td>
                    <td className="py-2 px-3 text-right font-medium">
                      {item.price * item.quantity} Kč
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold">
                  <td className="py-2 px-3" colSpan={3}>
                    Celkem
                  </td>
                  <td className="py-2 px-3 text-right">
                    {order.totalPrice} Kč
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => router.push("/orders")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Zpět na seznam
          </button>
          {order.status === "active" && (
            <button
              onClick={() => {
                if (window.confirm("Opravdu chcete zrušit tuto objednávku?")) {
                  console.log("Zrušení objednávky", order.id);
                  // Zde by byl API call pro zrušení objednávky
                  router.push("/orders");
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Zrušit objednávku
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
