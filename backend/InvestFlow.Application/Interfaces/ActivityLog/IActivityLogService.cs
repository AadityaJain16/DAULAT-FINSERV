using InvestFlow.Application.DTOs.ActivityLog;

namespace InvestFlow.Application.Interfaces.ActivityLog;

public interface IActivityLogService
{
    Task<IEnumerable<ActivityLogResponseDto>>
    GetByTypeAsync(
        string activityType);
    Task LogAsync(
        string activityType,
        string description);

    Task<IEnumerable<ActivityLogResponseDto>>
        GetAllAsync();
}