namespace InvestFlow.Application.DTOs.ActivityLog;

public class ActivityLogResponseDto
{
    public int Id { get; set; }

    public string ActivityType { get; set; }
        = string.Empty;

    public string Description { get; set; }
        = string.Empty;

    public DateTime CreatedAt { get; set; }
}