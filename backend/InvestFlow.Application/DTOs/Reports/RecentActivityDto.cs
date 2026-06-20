namespace InvestFlow.Application.DTOs.Reports;

public class RecentActivityDto
{
    public string ActivityType { get; set; }
        = string.Empty;

    public string Description { get; set; }
        = string.Empty;

    public DateTime CreatedAt { get; set; }
}