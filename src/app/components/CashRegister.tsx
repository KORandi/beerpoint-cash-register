import React, { useState, useEffect, ChangeEvent } from "react";

// Define interfaces for the component's props and state
interface Transaction {
  id: number;
  type: "add" | "remove";
  amount: number;
  timestamp: Date;
}

interface CashRegisterProps {
  initialBalance?: number;
  onBalanceChange?: (newBalance: number) => void;
}

export default function CashRegister({
  initialBalance,
  onBalanceChange,
}: CashRegisterProps) {
  const [balance, setBalance] = useState<number>(initialBalance || 0);
  const [amount, setAmount] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Pokud se změní počáteční stav, aktualizujeme stav
    setBalance(initialBalance || 0);
  }, [initialBalance]);

  const handleAddMoney = (): void => {
    if (!amount || parseFloat(amount) <= 0) return;

    const parsedAmount = parseFloat(amount);
    const newBalance = balance + parsedAmount;

    setBalance(newBalance);

    if (onBalanceChange) {
      onBalanceChange(newBalance);
    }

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        type: "add",
        amount: parsedAmount,
        timestamp: new Date(),
      },
    ]);

    setAmount("");
  };

  const handleRemoveMoney = (): void => {
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance)
      return;

    const parsedAmount = parseFloat(amount);
    const newBalance = balance - parsedAmount;

    setBalance(newBalance);

    if (onBalanceChange) {
      onBalanceChange(newBalance);
    }

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        type: "remove",
        amount: parsedAmount,
        timestamp: new Date(),
      },
    ]);

    setAmount("");
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Pokladna</h2>

      <div className="mb-6">
        <div className="text-center">
          <span className="text-gray-600">Aktuální stav</span>
          <p className="text-3xl font-bold">{balance.toLocaleString()} Kč</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Částka"
            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleAddMoney}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Vložit peníze
          </button>
          <button
            onClick={handleRemoveMoney}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Vybrat peníze
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Historie transakcí</h3>
        {transactions.length > 0 ? (
          <div className="overflow-y-auto max-h-48">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Typ</th>
                  <th className="py-2 px-3 text-right">Částka</th>
                  <th className="py-2 px-3 text-right">Čas</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2 px-3">
                      {transaction.type === "add" ? "Vklad" : "Výběr"}
                    </td>
                    <td
                      className={`py-2 px-3 text-right ${
                        transaction.type === "add"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "add" ? "+" : "-"}
                      {transaction.amount.toLocaleString()} Kč
                    </td>
                    <td className="py-2 px-3 text-right text-gray-500 text-sm">
                      {transaction.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">Žádné transakce</p>
        )}
      </div>
    </div>
  );
}
