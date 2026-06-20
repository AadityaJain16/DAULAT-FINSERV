using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class Notification : BaseEntity
{
    public int InvestorId { get; set; }

    public Investor Investor { get; set; } = null!;

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }
}