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
        `₹${Number(
          dashboard.totalInvestment ?? 0
        ).toLocaleString()}`,
      ],
      [
        "Total Withdrawals",
        `₹${Number(
          dashboard.totalWithdrawals ?? 0
        ).toLocaleString()}`,
      ],
      [
        "Profit Earned",
        `₹${Number(
          dashboard.totalProfitEarned ?? 0
        ).toLocaleString()}`,
      ],
      [
        "Accumulated Interest",
        `₹${Number(
          dashboard.totalAccumulatedInterest ?? 0
        ).toLocaleString()}`,
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
          activity.activityDate
        ).toLocaleDateString(),
      ]
    ),
  });

  doc.save(
    "DAULAT_FINSERV_Report.pdf"
  );
};