namespace InvestFlow.Application.DTOs.Investor;

public class InvestorResponseDto
{
    public int InvestorId { get; set; }

    public int UserId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    // Current principal
    public decimal TotalInvestment { get; set; }

    // Lifetime invested amount
    public decimal TotalInvested { get; set; }

    // Profit waiting for annual compounding
    public decimal AccumulatedInterest { get; set; }

    // Lifetime withdrawals
    public decimal TotalWithdrawn { get; set; }

    // Lifetime profit
    public decimal TotalProfitEarned { get; set; }
}