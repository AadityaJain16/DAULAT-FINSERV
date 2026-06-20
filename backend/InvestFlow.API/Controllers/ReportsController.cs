using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.Reports;
using InvestFlow.Application.Interfaces.Reports;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class ReportsController
    : ControllerBase
{
    private readonly
        IReportService
        _reportService;

    public ReportsController(
        IReportService reportService)
    {
        _reportService =
            reportService;
    }

    [HttpGet("recent-activity")]
    public async Task<IActionResult>
        RecentActivity()
    {
        var activities =
            await _reportService
                .GetRecentActivityAsync();

        return Ok(
            new ApiResponse<
                IEnumerable<RecentActivityDto>>
            {
                Success = true,
                Message =
                    "Recent activity retrieved successfully.",
                Data = activities
            });
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult>
        Dashboard()
    {
        var summary =
            await _reportService
                .GetDashboardSummaryAsync();

        return Ok(
            new ApiResponse<
                DashboardSummaryDto>
            {
                Success = true,
                Message =
                    "Dashboard summary retrieved successfully.",
                Data = summary
            });
    }
}   