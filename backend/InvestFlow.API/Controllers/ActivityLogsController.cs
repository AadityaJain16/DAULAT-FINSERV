using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.ActivityLog;
using InvestFlow.Application.Interfaces.ActivityLog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class ActivityLogsController
    : ControllerBase
{
    private readonly
        IActivityLogService
        _activityLogService;

    public ActivityLogsController(
        IActivityLogService
            activityLogService)
    {
        _activityLogService =
            activityLogService;
    }

    [HttpGet("filter")]
    public async Task<IActionResult>
        Filter(
            string activityType)
    {
        var logs =
            await _activityLogService
                .GetByTypeAsync(
                    activityType);

        return Ok(
            new ApiResponse<
                IEnumerable<ActivityLogResponseDto>>
            {
                Success = true,
                Message =
                    "Activity logs filtered successfully.",
                Data = logs
            });
    }

    [HttpGet]
    public async Task<IActionResult>
        GetAll()
    {
        var logs =
            await _activityLogService
                .GetAllAsync();

        return Ok(
            new ApiResponse<
                IEnumerable<ActivityLogResponseDto>>
            {
                Success = true,
                Message =
                    "Activity logs retrieved successfully.",
                Data = logs
            });
    }
}