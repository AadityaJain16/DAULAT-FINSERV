using InvestFlow.Domain.Common;

namespace InvestFlow.Domain.Entities;

public class ActivityLog : BaseEntity
{
    public string ActivityType { get; set; }
        = string.Empty;

    public string Description { get; set; }
        = string.Empty;
}