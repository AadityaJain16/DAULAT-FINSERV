namespace InvestFlow.Application.DTOs.InvestorPortal;

public class InvestorDashboardDto
{
    public string FullName { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public decimal TotalInvestment { get; set; }

    public decimal TotalInvested { get; set; }

    public decimal TotalWithdrawn { get; set; }

    public decimal AccumulatedInterest { get; set; }

    public decimal TotalProfitEarned { get; set; }

    public int TotalInvestments { get; set; }

    public int TotalWithdrawals { get; set; }

    public int TotalProfitRecords { get; set; }

    public int TotalNotifications { get; set; }
}