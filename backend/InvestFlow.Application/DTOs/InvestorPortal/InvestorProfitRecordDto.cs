namespace InvestFlow.Application.DTOs.InvestorPortal;

public class InvestorProfitRecordDto
{
    public int Month { get; set; }

    public int Year { get; set; }

    public decimal OpeningPrincipal { get; set; }

    public decimal ProfitBase { get; set; }

    public decimal MonthlyProfit { get; set; }

    public decimal ClosingPrincipal { get; set; }

    public DateTime CalculationDate { get; set; }
}