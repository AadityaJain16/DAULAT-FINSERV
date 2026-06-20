import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportReportPdf = (
  dashboard,
  activities
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "DAULAT FINSERV Business Report",
    14,
    20
  );

  autoTable(doc, {
    startY: 30,

    head: [["Metric", "Value"]],

    body: [
      [
        "Total Investors",
        dashboard.totalInvestors,
      ],
      [
        "Total Investment",
        `₹${dashboard.totalInvestment}`,
      ],
      [
        "Total Withdrawals",
        `₹${dashboard.totalWithdrawals}`,
      ],
      [
        "Profit Distributed",
        `₹${dashboard.totalProfitDistributed}`,
      ],
      [
        "Notifications",
        dashboard.totalNotifications,
      ],
    ],
  });

  autoTable(doc, {
    startY:
      doc.lastAutoTable.finalY + 15,

    head: [
      [
        "Type",
        "Description",
        "Date",
      ],
    ],

    body: activities.map(
      (activity) => [
        activity.activityType,
        activity.description,
        new Date(
          activity.createdAt
        ).toLocaleString(),
      ]
    ),
  });

  doc.save(
    "DAULAT_FINSERV_Report.pdf"
  );
};