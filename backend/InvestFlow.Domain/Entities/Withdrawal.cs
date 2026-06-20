using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class Withdrawal : BaseEntity
{
    public int InvestorId { get; set; }

    public Investor Investor { get; set; } = null!;

    public decimal Amount { get; set; }

    public DateTime WithdrawalDate { get; set; }
}