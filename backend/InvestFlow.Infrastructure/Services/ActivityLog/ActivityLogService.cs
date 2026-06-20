using InvestFlow.Application.DTOs.ActivityLog;
using InvestFlow.Application.Interfaces.ActivityLog;
using InvestFlow.Domain.Entities;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using ActivityLogEntity =InvestFlow.Domain.Entities.ActivityLog;
namespace InvestFlow.Infrastructure.Services.ActivityLog;

public class ActivityLogService
    : IActivityLogService
{
    private readonly ApplicationDbContext _context;

    public ActivityLogService(
        ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<
    IEnumerable<ActivityLogResponseDto>>
    GetByTypeAsync(
        string activityType)
{
    return await _context.ActivityLogs
        .Where(x =>
            x.ActivityType ==
            activityType)
        .OrderByDescending(
            x => x.CreatedAt)
        .Select(x =>
            new ActivityLogResponseDto
            {
                Id = x.Id,
                ActivityType =x.ActivityType,
                Description =
                    x.Description,
                CreatedAt =
                    x.CreatedAt
            })
        .ToListAsync();
}

    public async Task LogAsync(
        string activityType,
        string description)
    {
        var log = new ActivityLogEntity
{
    ActivityType = activityType,
    Description = description,
    CreatedAt = DateTime.UtcNow,
    UpdatedAt = DateTime.UtcNow
};

        _context.ActivityLogs.Add(log);

        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<ActivityLogResponseDto>>
        GetAllAsync()
    {
        return await _context.ActivityLogs
            .OrderByDescending(x => x.CreatedAt)
            .Select(x =>
                new ActivityLogResponseDto
                {
                    Id = x.Id,
                    ActivityType = x.ActivityType,
                    Description = x.Description,
                    CreatedAt = x.CreatedAt
                })
            .ToListAsync();
    }
}