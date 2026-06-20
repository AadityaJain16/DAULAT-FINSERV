namespace InvestFlow.Application.DTOs.Notification;

public class NotificationResponseDto
{
    public int NotificationId { get; set; }

    public int InvestorId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public DateTime CreatedAt { get; set; }
}