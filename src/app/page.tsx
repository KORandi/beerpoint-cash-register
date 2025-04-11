import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define interfaces for the dashboard data structure
interface OrderItem {
  name: string;
  quantity: number;
}

interface ActiveOrder {
  id: string;
  table: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

interface DailySummary {
  date: string;
  sales: number;
  orderCount: number;
  averageOrderValue: number;
}

interface WeeklySales {
  day: string;
  sales: number;
}

interface PopularItem {
  name: string;
  count: number;
}

interface DashboardData {
  today: DailySummary;
  activeOrders: ActiveOrder[];
  lastWeekSales: WeeklySales[];
  popularItems: PopularItem[];
}

export default function HomePage(): JSX.Element {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        // setDashboardData(data);

        // Simulovaná data pro ukázku
        setDashboardData({
          today: {
            date: format(new Date(), "d. MMMM yyyy", { locale: cs }),
            sales: 12560,
            orderCount: 18,
            averageOrderValue: 698,
          },
          activeOrders: [
            {
              id: "1",
              table: "3",
              items: [
                { name: "Smažený sýr", quantity: 2 },
                { name: "Pilsner Urquell 0.5l", quantity: 3 },
              ],
              totalPrice: 423,
              createdAt: new Date().toISOString(),
            },
            {
              id: "2",
              table: "7",
              items: [
                { name: "Svíčková na smetaně", quantity: 1 },
                { name: "Coca-Cola 0.33l", quantity: 1 },
              ],
              totalPrice: 234,
              createdAt: new Date(Date.now() - 3600000).toISOString(),
            },
          ],
          lastWeekSales: [
            { day: "Po", sales: 9800 },
            { day: "Út", sales: 8700 },
            { day: "St", sales: 10500 },
            { day: "Čt", sales: 12300 },
            { day: "Pá", sales: 17600 },
            { day: "So", sales: 19200 },
            { day: "Ne", sales: 15800 },
          ],
          popularItems: [
            { name: "Smažený sýr", count: 37 },
            { name: "Svíčková na smetaně", count: 28 },
            { name: "Pilsner Urquell 0.5l", count: 112 },
            { name: "Kofola 0.5l", count: 78 },
          ],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání dat dashboardu:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout title="Přehled | Hospodský systém">
      <h1 className="text-2xl font-bold mb-6">Přehled</h1>

      {isLoading ? (
        <p>Načítání dat...</p>
      ) : (
        dashboardData && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Dnešní tržby</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {dashboardData.today.date}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {dashboardData.today.sales.toLocaleString()} Kč
                </p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Počet objednávek:</span>
                    <span className="font-medium">
                      {dashboardData.today.orderCount}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Průměrná objednávka:</span>
                    <span className="font-medium">
                      {dashboardData.today.averageOrderValue} Kč
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Aktivní objednávky</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {dashboardData.activeOrders.length}
                  </span>
                </div>

                {dashboardData.activeOrders.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.activeOrders.map((order) => (
                      <div key={order.id} className="border-b pb-2">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            Stůl {order.table}
                          </span>
                          <span>
                            {format(new Date(order.createdAt), "HH:mm")}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.quantity}× {item.name}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                          <Link
                            href={`/orders/${order.id}`}
                            className="text-blue-600 text-sm"
                          >
                            Detail
                          </Link>
                          <span className="font-semibold">
                            {order.totalPrice} Kč
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">Žádné aktivní objednávky</p>
                )}

                <div className="mt-4">
                  <Link
                    href="/orders"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Zobrazit všechny objednávky →
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Rychlé akce</h2>
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    href="/orders/add"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
                  >
                    Nová objednávka
                  </Link>
                  <Link
                    href="/menu/add"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
                  >
                    Přidat položku do menu
                  </Link>
                  <Link
                    href="/accounting/daily"
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded text-center"
                  >
                    Denní uzávěrka
                  </Link>
                  <Link
                    href="/accounting/monthly"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-center"
                  >
                    Měsíční přehled
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">
                  Tržby za poslední týden
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboardData.lastWeekSales}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value} Kč`} />
                      <Bar dataKey="sales" name="Tržby" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">
                  Nejprodávanější položky
                </h2>
                <div className="space-y-3">
                  {dashboardData.popularItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.count}×
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </Layout>
  );
}
