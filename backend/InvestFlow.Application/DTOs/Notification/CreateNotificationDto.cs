namespace InvestFlow.Application.DTOs.Notification;

public class CreateNotificationDto
{
    public int InvestorId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}