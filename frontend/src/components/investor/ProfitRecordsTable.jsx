const ProfitRecordsTable = ({
  records,
}) => {
  return (
    <div className="overflow-x-auto">
      <table
        className="
          min-w-full
          text-sm
        "
      >
        <thead>
          <tr
            className="
              border-b
              border-slate-700
            "
          >
            <th className="text-left p-3">
              Month
            </th>

            <th className="text-left p-3">
              Year
            </th>

            <th className="text-left p-3">
              Opening Principal
            </th>

            <th className="text-left p-3">
              Profit Base
            </th>

            <th className="text-left p-3">
              Monthly Profit
            </th>

            <th className="text-left p-3">
              Closing Principal
            </th>

            <th className="text-left p-3">
              Calculation Date
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map(
            (record, index) => (
              <tr
                key={index}
                className="
                  border-b
                  border-slate-800
                "
              >
                <td className="p-3">
                  {record.month}
                </td>

                <td className="p-3">
                  {record.year}
                </td>

                <td className="p-3">
                  ₹{Number(
                    record.openingPrincipal
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  ₹{Number(
                    record.profitBase
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  ₹{Number(
                    record.monthlyProfit
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  ₹{Number(
                    record.closingPrincipal
                  ).toLocaleString()}
                </td>

                <td className="p-3">
                  {new Date(
                    record.calculationDate
                  ).toLocaleDateString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitRecordsTable;