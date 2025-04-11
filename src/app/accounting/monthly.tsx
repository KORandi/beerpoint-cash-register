import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import MonthlyReport from "../components/MonthlyReport";

// Define interfaces for the data structure
interface DailyData {
  day: number;
  dayOfWeek: string;
  date: string;
  sales: number;
  expenses: number;
  profit: number;
}

interface CategoryData {
  name: string;
  amount: number;
}

interface ReportSummary {
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
  summary: ReportSummary;
}

export default function MonthlyAccountingPage() {
  const [reportData, setReportData] = useState<MonthlyReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );

  useEffect(() => {
    const fetchMonthlyReport = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch(`/api/accounting/monthly?month=${selectedMonth}`);
        // const data = await response.json();
        // setReportData(data);

        // Simulovaná data pro ukázku
        const [year, month] = selectedMonth.split("-");
        const monthName = format(
          new Date(parseInt(year), parseInt(month) - 1, 1),
          "LLLL yyyy",
          { locale: cs }
        );

        // Generujeme denní data pro celý měsíc
        const daysInMonth = new Date(
          parseInt(year),
          parseInt(month),
          0
        ).getDate();
        const dailyData: DailyData[] = [];

        let totalSales = 0;
        let totalExpenses = 0;

        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(parseInt(year), parseInt(month) - 1, i);
          const dayOfWeek = format(date, "E", { locale: cs });

          // Náhodná data pro demonstraci (v reálném nasazení by se načítala z DB)
          const daySales = Math.floor(Math.random() * 15000) + 5000;
          const dayExpenses = Math.floor(Math.random() * 3000) + 1000;

          totalSales += daySales;
          totalExpenses += dayExpenses;

          dailyData.push({
            day: i,
            dayOfWeek,
            date: format(date, "d. M.", { locale: cs }),
            sales: daySales,
            expenses: dayExpenses,
            profit: daySales - dayExpenses,
          });
        }

        // Kategorie prodejů za měsíc
        const categories: CategoryData[] = [
          { name: "Hlavní jídla", amount: Math.floor(totalSales * 0.45) },
          { name: "Nápoje", amount: Math.floor(totalSales * 0.3) },
          { name: "Předkrmy", amount: Math.floor(totalSales * 0.15) },
          { name: "Dezerty", amount: Math.floor(totalSales * 0.1) },
        ];

        // Kategorie výdajů za měsíc
        const expenseCategories: CategoryData[] = [
          { name: "Suroviny", amount: Math.floor(totalExpenses * 0.6) },
          { name: "Personál", amount: Math.floor(totalExpenses * 0.25) },
          { name: "Energie", amount: Math.floor(totalExpenses * 0.1) },
          { name: "Ostatní", amount: Math.floor(totalExpenses * 0.05) },
        ];

        setReportData({
          month: monthName,
          dailyData,
          summary: {
            totalSales,
            totalExpenses,
            profit: totalSales - totalExpenses,
            profitMargin: (
              ((totalSales - totalExpenses) / totalSales) *
              100
            ).toFixed(2),
            averageDailySales: Math.floor(totalSales / daysInMonth),
            categories,
            expenseCategories,
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání měsíční uzávěrky:", error);
        setIsLoading(false);
      }
    };

    fetchMonthlyReport();
  }, [selectedMonth]);

  const printReport = (): void => {
    window.print();
  };

  return (
    <Layout title={`Měsíční uzávěrka | Hospodský systém`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Měsíční uzávěrka {reportData?.month}
        </h1>

        <div className="flex space-x-2 items-center">
          <div>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            onClick={printReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tisk
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Načítání uzávěrky...</p>
      ) : (
        <MonthlyReport data={reportData as MonthlyReportData} />
      )}
    </Layout>
  );
}
