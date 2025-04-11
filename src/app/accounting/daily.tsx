import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "../components/Layout";
import { format, parse } from "date-fns";
import { cs } from "date-fns/locale";
import DailyReport from "../components/DailyReport";

// Define interfaces for the data structure
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

export default function DailyAccountingPage() {
  const date = useSearchParams().get("date");
  const [reportData, setReportData] = useState<DailyReportData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    if (!date) return;

    const fetchDailyReport = async (): Promise<void> => {
      try {
        // V produkci by toto byl API call
        // const response = await fetch(`/api/accounting/daily?date=${date}`);
        // const data = await response.json();
        // setReportData(data);

        // Simulovaná data pro ukázku
        const formattedDate = format(
          parse(date as string, "yyyy-MM-dd", new Date()),
          "d. MMMM yyyy",
          { locale: cs }
        );

        setReportData({
          date: formattedDate,
          closed: false,
          sales: {
            totalSales: 15670,
            itemsSold: 87,
            orderCount: 23,
            averageOrderValue: 681,
            categories: [
              { name: "Hlavní jídla", amount: 8340 },
              { name: "Předkrmy", amount: 1250 },
              { name: "Nápoje", amount: 4230 },
              { name: "Dezerty", amount: 1850 },
            ],
            paymentMethods: [
              { method: "Hotovost", amount: 9402 },
              { method: "Karta", amount: 6268 },
            ],
          },
          expenses: {
            total: 3200,
            items: [
              { name: "Suroviny", amount: 2500 },
              { name: "Režijní náklady", amount: 700 },
            ],
          },
          cash: {
            openingBalance: 5000,
            closingBalance: null,
            difference: null,
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Chyba při načítání denní uzávěrky:", error);
        setIsLoading(false);
      }
    };

    fetchDailyReport();
  }, [date]);

  const handleClosingBalance = (closingBalance: number): void => {
    if (!reportData) return;

    const openingBalance = reportData.cash.openingBalance;
    const cashPayment = reportData.sales.paymentMethods.find(
      (m) => m.method === "Hotovost"
    );
    const expectedBalance = openingBalance + (cashPayment?.amount || 0);

    setReportData({
      ...reportData,
      cash: {
        openingBalance,
        closingBalance,
        difference: closingBalance - expectedBalance,
      },
    });
  };

  const closeDay = async (): Promise<void> => {
    if (!reportData) return;

    if (!reportData.cash.closingBalance) {
      alert("Nejprve zadejte konečný stav pokladny");
      return;
    }

    try {
      // V produkci by toto byl API call
      // const response = await fetch(`/api/accounting/daily/close`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     date,
      //     ...reportData
      //   })
      // });

      // if (response.ok) {
      //   setIsClosed(true);
      // }

      // Simulace úspěšného uzavření
      console.log("Denní uzávěrka uzavřena:", {
        ...reportData,
      });

      setIsClosed(true);

      // Aktualizujeme data
      setReportData({
        ...reportData,
        closed: true,
      });
    } catch (error) {
      console.error("Chyba při uzavírání dne:", error);
    }
  };

  const printReport = (): void => {
    window.print();
  };

  return (
    <Layout title={`Denní uzávěrka | Hospodský systém`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Denní uzávěrka {reportData?.date}
        </h1>

        <div className="flex space-x-2">
          <button
            onClick={printReport}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Tisk
          </button>

          {!isClosed && reportData && !reportData.closed && (
            <button
              onClick={closeDay}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Uzavřít den
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <p>Načítání uzávěrky...</p>
      ) : (
        reportData && (
          <DailyReport
            data={reportData}
            onClosingBalanceChange={handleClosingBalance}
            isClosed={isClosed || reportData.closed}
          />
        )
      )}
    </Layout>
  );
}
