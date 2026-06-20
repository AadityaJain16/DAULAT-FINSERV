using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class Investment : BaseEntity
{
    public int InvestorId { get; set; }

    public Investor Investor { get; set; } = null!;

    public decimal Amount { get; set; }

    public DateTime InvestmentDate { get; set; }

    public bool IsCarryForward { get; set; }
}