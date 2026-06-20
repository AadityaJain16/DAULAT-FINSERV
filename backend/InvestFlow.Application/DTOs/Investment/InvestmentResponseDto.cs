namespace InvestFlow.Application.DTOs.Investment;

public class InvestmentResponseDto
{
    public int InvestmentId { get; set; }

    public int InvestorId { get; set; }

    public decimal Amount { get; set; }

    public DateTime InvestmentDate { get; set; }
}