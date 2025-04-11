import { useState, ChangeEvent } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

// Define types for export data options
type ExportDataType = "day" | "month" | "year";

export default function AccountingPage(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const [exportType, setExportType] = useState<ExportDataType>("day");

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(e.target.value);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedMonth(e.target.value);
  };

  const handleExportTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setExportType(e.target.value as ExportDataType);
  };

  const handleExport = (): void => {
    // In a real implementation, this would make an API call to generate and download a PDF
    console.log(`Exporting ${exportType} data as PDF`);
    alert(
      `Exportování ${
        exportType === "day"
          ? "denních"
          : exportType === "month"
          ? "měsíčních"
          : "ročních"
      } dat bylo zahájeno.`
    );
  };

  return (
    <Layout title="Účetnictví | Hospodský systém">
      <h1 className="text-2xl font-bold mb-6">Účetnictví</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Denní uzávěrka</h2>
          <p className="text-gray-600 mb-4">Vytvořte denní uzávěrku a tržby</p>
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Link
            href={`/accounting/daily?date=${selectedDate}`}
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Zobrazit denní uzávěrku
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Měsíční uzávěrka</h2>
          <p className="text-gray-600 mb-4">
            Přehled měsíčních tržeb a nákladů
          </p>
          <div className="mb-4">
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Link
            href={`/accounting/monthly?month=${selectedMonth}`}
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Zobrazit měsíční uzávěrku
          </Link>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Exportovat data</h2>
          <p className="text-gray-600 mb-4">
            Stáhněte si účetní data pro externí použití
          </p>
          <div className="mb-4">
            <select
              value={exportType}
              onChange={handleExportTypeChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="day">Denní data</option>
              <option value="month">Měsíční data</option>
              <option value="year">Roční data</option>
            </select>
          </div>
          <button
            onClick={handleExport}
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Exportovat (PDF)
          </button>
        </div>
      </div>
    </Layout>
  );
}
