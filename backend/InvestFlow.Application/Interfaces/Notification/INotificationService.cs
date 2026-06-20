using InvestFlow.Application.DTOs.Notification;

namespace InvestFlow.Application.Interfaces.Notification;

public interface INotificationService
{
    Task<NotificationResponseDto> CreateAsync(
        CreateNotificationDto request);

    Task<IEnumerable<NotificationResponseDto>>
        GetByInvestorIdAsync(int investorId);
    Task<IEnumerable<NotificationResponseDto>> GetAllAsync();
    Task MarkAsReadAsync(int notificationId);
}