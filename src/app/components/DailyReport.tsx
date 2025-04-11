import React, { useState, ChangeEvent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

// Define interfaces for the component's props
interface CategorySales {
  name: string;
  amount: number;
}

interface PaymentMethod {
  method: string;
  amount: number;
}

interface ExpenseItem {
  name: string;
  amount: number;
}

interface CashBalance {
  openingBalance: number;
  closingBalance: number | null;
  difference: number | null;
}

interface SalesData {
  totalSales: number;
  itemsSold: number;
  orderCount: number;
  averageOrderValue: number;
  categories: CategorySales[];
  paymentMethods: PaymentMethod[];
}

interface ExpensesData {
  total: number;
  items: ExpenseItem[];
}

interface DailyReportData {
  date: string;
  closed: boolean;
  sales: SalesData;
  expenses: ExpensesData;
  cash: CashBalance;
}

interface DailyReportProps {
  data: DailyReportData;
  onClosingBalanceChange: (value: number) => void;
  isClosed: boolean;
}

export default function DailyReport({
  data,
  onClosingBalanceChange,
  isClosed,
}: DailyReportProps) {
  const [closingBalance, setClosingBalance] = useState<string>("");

  const handleClosingBalanceChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setClosingBalance(value);
    if (value) {
      onClosingBalanceChange(parseFloat(value));
    }
  };

  const profit = data.sales.totalSales - data.expenses.total;
  const profitMargin = ((profit / data.sales.totalSales) * 100).toFixed(2);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Prodeje</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="font-medium">Celkové tržby:</span>
              <span className="font-bold">{data.sales.totalSales} Kč</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Počet prodaných položek:</span>
              <span>{data.sales.itemsSold}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Počet objednávek:</span>
              <span>{data.sales.orderCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Průměrná hodnota objednávky:</span>
              <span>{data.sales.averageOrderValue} Kč</span>
            </div>
          </div>

          <h3 className="font-bold mb-2">Rozdělení podle kategorií</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.sales.categories}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {data.sales.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value} Kč`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Platební metody</h2>

          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.sales.paymentMethods}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value} Kč`} />
                <Legend />
                <Bar dataKey="amount" name="Částka" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <h2 className="text-xl font-bold mb-4">Výdaje</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-medium">
              <span>Celkové výdaje:</span>
              <span className="font-bold text-red-500">
                {data.expenses.total} Kč
              </span>
            </div>

            {data.expenses.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}:</span>
                <span>{item.amount} Kč</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Zisk</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Celkové tržby:</span>
              <span>{data.sales.totalSales} Kč</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Celkové výdaje:</span>
              <span>{data.expenses.total} Kč</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span className="font-medium">Čistý zisk:</span>
              <span className="font-bold text-green-600">{profit} Kč</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Marže:</span>
              <span>{profitMargin}%</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Pokladna</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Počáteční stav:</span>
              <span>{data.cash.openingBalance} Kč</span>
            </div>

            <div className="flex items-center">
              <span className="font-medium mr-2">Konečný stav:</span>
              {isClosed ? (
                <span className="font-bold">{data.cash.closingBalance} Kč</span>
              ) : (
                <input
                  type="number"
                  value={closingBalance}
                  onChange={handleClosingBalanceChange}
                  className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
                  placeholder="Zadejte částku"
                />
              )}
            </div>

            {data.cash.difference !== null && (
              <div className="flex justify-between pt-2 mt-2 border-t">
                <span className="font-medium">Rozdíl:</span>
                <span
                  className={`font-bold ${
                    data.cash.difference >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {data.cash.difference} Kč
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isClosed && (
        <div className="mt-6 p-3 bg-green-100 text-green-800 rounded">
          <p className="font-bold">Denní uzávěrka byla uzavřena.</p>
        </div>
      )}
    </div>
  );
}
