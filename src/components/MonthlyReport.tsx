import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define interfaces for the component's props
interface CategoryData {
  name: string;
  amount: number;
}

interface DailyData {
  day: number;
  dayOfWeek: string;
  date: string;
  sales: number;
  expenses: number;
  profit: number;
}

interface SummaryData {
  totalSales: number;
  totalExpenses: number;
  profit: number;
  profitMargin: string;
  averageDailySales: number;
  categories: CategoryData[];
  expenseCategories: CategoryData[];
}

interface MonthlyReportData {
  month: string;
  dailyData: DailyData[];
  summary: SummaryData;
}

interface MonthlyReportProps {
  data: MonthlyReportData;
}

export default function MonthlyReport({ data }: MonthlyReportProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Měsíční přehled tržeb a výdajů
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value} Kč`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Tržby"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Výdaje"
                stroke="#ff7300"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                name="Zisk"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Souhrn</h2>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="font-medium">Celkové tržby:</span>
              <span className="font-bold">
                {data.summary.totalSales.toLocaleString()} Kč
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Celkové výdaje:</span>
              <span className="font-bold text-red-500">
                {data.summary.totalExpenses.toLocaleString()} Kč
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-medium">Čistý zisk:</span>
              <span className="font-bold text-green-600">
                {data.summary.profit.toLocaleString()} Kč
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Marže:</span>
              <span>{data.summary.profitMargin}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Průměrná denní tržba:</span>
              <span>{data.summary.averageDailySales.toLocaleString()} Kč</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Tržby podle kategorií</h3>
            <div className="space-y-1">
              {data.summary.categories.map((category, index) => (
                <div key={index} className="flex justify-between">
                  <span>{category.name}:</span>
                  <span>{category.amount.toLocaleString()} Kč</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Výdaje</h2>

          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.summary.expenseCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value} Kč`} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Částka"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold">Výdaje podle kategorií</h3>
            <div className="space-y-1">
              {data.summary.expenseCategories.map((category, index) => (
                <div key={index} className="flex justify-between">
                  <span>{category.name}:</span>
                  <span>{category.amount.toLocaleString()} Kč</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Denní přehled</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Den</th>
                <th className="py-3 px-4 text-left">Datum</th>
                <th className="py-3 px-4 text-right">Tržby</th>
                <th className="py-3 px-4 text-right">Výdaje</th>
                <th className="py-3 px-4 text-right">Zisk</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {data.dailyData.map((day) => (
                <tr
                  key={day.day}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4 text-left">
                    {day.day}. ({day.dayOfWeek})
                  </td>
                  <td className="py-3 px-4 text-left">{day.date}</td>
                  <td className="py-3 px-4 text-right">
                    {day.sales.toLocaleString()} Kč
                  </td>
                  <td className="py-3 px-4 text-right">
                    {day.expenses.toLocaleString()} Kč
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-medium ${
                      day.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {day.profit.toLocaleString()} Kč
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
