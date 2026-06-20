using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class SystemJobExecution : BaseEntity
{
    public string JobName { get; set; } = string.Empty;

    public int Month { get; set; }

    public int Year { get; set; }

    public DateTime ExecutedAt { get; set; }

    public bool Success { get; set; }
}