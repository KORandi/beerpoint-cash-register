"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import OrderList from "../components/OrderList";

// Define interfaces for the data structure
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type OrderStatus = "active" | "completed" | "cancelled";
type ActiveTabType = "active" | "completed";

interface Order {
  id: string;
  table: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
  notes?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<ActiveTabType>("active");

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch(`/api/orders?status=${activeTab}`);
        // const data = await response.json();
        // setOrders(data);

        // Simulovaná data pro ukázku
        setOrders([
          {
            id: "1",
            table: "3",
            status: "active",
            items: [
              { id: "1", name: "Smažený sýr", price: 129, quantity: 2 },
              { id: "3", name: "Pilsner Urquell 0.5l", price: 55, quantity: 3 },
            ],
            totalPrice: 423,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            table: "7",
            status: "active",
            items: [
              { id: "2", name: "Svíčková na smetaně", price: 189, quantity: 1 },
              { id: "4", name: "Coca-Cola 0.33l", price: 45, quantity: 1 },
            ],
            totalPrice: 234,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání objednávek:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  return (
    <Layout title="Objednávky | Hospodský systém">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Objednávky</h1>
        <Link
          href="/orders/add"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Nová objednávka
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "active"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Aktivní
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "completed"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Dokončené
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Načítání objednávek...</p>
      ) : orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <p className="text-gray-500">
          Žádné {activeTab === "active" ? "aktivní" : "dokončené"} objednávky
        </p>
      )}
    </Layout>
  );
}
