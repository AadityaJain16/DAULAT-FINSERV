using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class ProfitRecord : BaseEntity
{
    public int InvestorId { get; set; }

    public Investor Investor { get; set; } = null!;

    public int Month { get; set; }

    public int Year { get; set; }

    public decimal OpeningPrincipal { get; set; }

    public decimal ProfitBase { get; set; }

    public decimal MonthlyProfit { get; set; }

    public decimal ClosingPrincipal { get; set; }

    public DateTime CalculationDate { get; set; }
}