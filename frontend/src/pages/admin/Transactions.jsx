import { useState } from "react";
import GlassCard from "../../components/common/GlassCard";

const mockTransactions = [
  {
    id: 1,
    investor: "Aman Sharma",
    amount: "₹10,000",
    date: "12 Jun 2026",
  },
  {
    id: 2,
    investor: "Rahul Verma",
    amount: "₹5,000",
    date: "10 Jun 2026",
  },
  {
    id: 3,
    investor: "Rohit Singh",
    amount: "₹20,000",
    date: "05 Jun 2026",
  },
];

const Transactions = () => {
  const [search, setSearch] = useState("");

  const filteredTransactions = mockTransactions.filter((item) =>
    item.investor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          Transactions
        </h1>

        <p className="text-slate-400 mt-2">
          All investment records
        </p>
      </div>

      <input
        type="text"
        placeholder="Search investor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          bg-white/5
          border border-white/10
          rounded-xl
          p-3
          text-white
          outline-none
        "
      />

      <GlassCard className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">
                Investor
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-white/5"
              >
                <td className="p-4">
                  {transaction.investor}
                </td>

                <td className="p-4 text-emerald-400">
                  {transaction.amount}
                </td>

                <td className="p-4 text-slate-400">
                  {transaction.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default Transactions;