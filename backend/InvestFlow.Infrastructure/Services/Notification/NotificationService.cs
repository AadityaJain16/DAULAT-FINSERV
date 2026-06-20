using InvestFlow.Application.DTOs.Notification;
using InvestFlow.Application.Interfaces.Notification;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.Notification;

public class NotificationService : INotificationService
{
    private readonly ApplicationDbContext _context;

    public NotificationService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<NotificationResponseDto>
        CreateAsync(
        CreateNotificationDto request)
    {
        var investor = await _context.Investors
            .FirstOrDefaultAsync(x =>
                x.Id == request.InvestorId);

        if (investor == null)
            throw new Exception("Investor not found.");

        var notification =
            new Domain.Entities.Notification
            {
                InvestorId = request.InvestorId,
                Title = request.Title,
                Message = request.Message,
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

        _context.Notifications.Add(notification);

        await _context.SaveChangesAsync();

        return new NotificationResponseDto
        {
            NotificationId = notification.Id,
            InvestorId = notification.InvestorId,
            Title = notification.Title,
            Message = notification.Message,
            IsRead = notification.IsRead,
            CreatedAt = notification.CreatedAt
        };
    }

    public async Task<IEnumerable<NotificationResponseDto>>
        GetByInvestorIdAsync(int investorId)
    {
        return await _context.Notifications
            .Where(x => x.InvestorId == investorId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new NotificationResponseDto
            {
                NotificationId = x.Id,
                InvestorId = x.InvestorId,
                Title = x.Title,
                Message = x.Message,
                IsRead = x.IsRead,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }
    public async Task<IEnumerable<NotificationResponseDto>>
    GetAllAsync()
{
    return await _context.Notifications
        .OrderByDescending(x => x.CreatedAt)
        .Select(x => new NotificationResponseDto
        {
            NotificationId = x.Id,
            InvestorId = x.InvestorId,
            Title = x.Title,
            Message = x.Message,
            IsRead = x.IsRead,
            CreatedAt = x.CreatedAt
        })
        .ToListAsync();
}
    public async Task MarkAsReadAsync(
    int notificationId)
{
    var notification =
        await _context.Notifications
            .FirstOrDefaultAsync(x =>
                x.Id == notificationId);

    if (notification == null)
        throw new Exception(
            "Notification not found.");

    notification.IsRead = true;
    notification.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();
}
}