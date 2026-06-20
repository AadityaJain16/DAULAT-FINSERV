namespace InvestFlow.Application.DTOs.Investor;

public class InvestorResponseDto
{
    public int InvestorId { get; set; }

    public int UserId { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public decimal TotalInvestment { get; set; }
}