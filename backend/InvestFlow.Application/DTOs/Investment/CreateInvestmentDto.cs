namespace InvestFlow.Application.DTOs.Investment;

public class CreateInvestmentDto
{
    public int InvestorId { get; set; }

    public decimal Amount { get; set; }

    public DateTime InvestmentDate { get; set; }
}