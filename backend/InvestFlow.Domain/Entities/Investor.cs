using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class Investor : BaseEntity
{
    public int UserId { get; set; }

    public User User { get; set; } = null!;

    public decimal TotalInvestment { get; set; }

    public decimal AccumulatedInterest { get; set; }

    public decimal TotalProfitEarned { get; set; }

    public decimal TotalInvested { get; set; }

    public decimal TotalWithdrawn { get; set; }
    public int LastCompoundedYear { get; set; }

    public decimal PendingInvestmentCarryForward { get; set; }

    public ICollection<Investment> Investments { get; set; }
        = new List<Investment>();

    public ICollection<ProfitRecord> ProfitRecords { get; set; }
        = new List<ProfitRecord>();

    public ICollection<Withdrawal> Withdrawals { get; set; }
        = new List<Withdrawal>();

    public ICollection<Notification> Notifications { get; set; }
        = new List<Notification>();
}