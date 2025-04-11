import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

// Define interfaces for the component's props
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
  createdAt: string;
  notes?: string;
}

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Stůl</th>
            <th className="py-3 px-6 text-left">Čas</th>
            <th className="py-3 px-6 text-right">Celkem</th>
            <th className="py-3 px-6 text-center">Akce</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">#{order.id}</span>
              </td>
              <td className="py-3 px-6 text-left">Stůl {order.table}</td>
              <td className="py-3 px-6 text-left">
                {format(new Date(order.createdAt), "HH:mm - dd.MM.yyyy", {
                  locale: cs,
                })}
              </td>
              <td className="py-3 px-6 text-right font-bold">
                {order.totalPrice} Kč
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <Link
                    href={`/orders/${order.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs mr-2"
                  >
                    Detail
                  </Link>
                  {order.status === "active" && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-xs"
                      onClick={() =>
                        console.log("Dokončit objednávku", order.id)
                      }
                    >
                      Dokončit
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
