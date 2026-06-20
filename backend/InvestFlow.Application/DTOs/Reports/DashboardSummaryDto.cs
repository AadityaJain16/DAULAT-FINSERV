namespace InvestFlow.Application.DTOs.Reports;

public class DashboardSummaryDto
{
    public int TotalInvestors { get; set; }

    public decimal TotalInvestment { get; set; }

    public decimal TotalWithdrawals { get; set; }

    public decimal TotalProfitEarned { get; set; }

    public decimal TotalAccumulatedInterest { get; set; }

    public int TotalNotifications { get; set; }
}