using System.Security.Claims;
using InvestFlow.Application.Common;
using InvestFlow.Application.Interfaces.InvestorPortal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/investor")]
[Authorize(Roles = "INVESTOR")]
public class InvestorController
    : ControllerBase
{
    private readonly
        IInvestorPortalService
        _investorPortalService;

    public InvestorController(
        IInvestorPortalService
            investorPortalService)
    {
        _investorPortalService =
            investorPortalService;
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult>
        Dashboard()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var result =
            await _investorPortalService
                .GetDashboardAsync(userId);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Dashboard retrieved successfully.",
                Data = result
            });
    }

    [HttpGet("investments")]
    public async Task<IActionResult>
        Investments()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var result =
            await _investorPortalService
                .GetInvestmentsAsync(userId);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Investments retrieved successfully.",
                Data = result
            });
    }

    [HttpGet("withdrawals")]
    public async Task<IActionResult>
        Withdrawals()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var result =
            await _investorPortalService
                .GetWithdrawalsAsync(userId);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Withdrawals retrieved successfully.",
                Data = result
            });
    }

    [HttpGet("profit-history")]
public async Task<IActionResult>
    ProfitHistory()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var result =
            await _investorPortalService
    .GetProfitHistoryAsync(userId);
        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
"Profit history retrieved successfully.",
                Data = result
            });
    }

    [HttpGet("notifications")]
    public async Task<IActionResult>
        Notifications()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var result =
            await _investorPortalService
                .GetNotificationsAsync(userId);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Notifications retrieved successfully.",
                Data = result
            });
    }
}