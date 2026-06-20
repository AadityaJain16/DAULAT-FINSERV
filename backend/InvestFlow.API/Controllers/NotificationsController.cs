using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.Notification;
using InvestFlow.Application.Interfaces.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class NotificationsController
    : ControllerBase
{
    private readonly
        INotificationService
        _notificationService;

    public NotificationsController(
        INotificationService
            notificationService)
    {
        _notificationService =
            notificationService;
    }

    [HttpPost]
    public async Task<IActionResult>
        Create(
            [FromBody]
            CreateNotificationDto request)
    {
        var result =
            await _notificationService
                .CreateAsync(request);

        return Ok(
            new ApiResponse<
                NotificationResponseDto>
            {
                Success = true,
                Message =
                    "Notification created successfully.",
                Data = result
            });
    }
    [HttpGet]
public async Task<IActionResult>
    GetAll()
{
    var notifications =
        await _notificationService
            .GetAllAsync();

    return Ok(
        new ApiResponse<
            IEnumerable<
                NotificationResponseDto>>
        {
            Success = true,
            Message =
                "Notifications retrieved successfully.",
            Data = notifications
        });
}

    [HttpGet("{investorId}")]
    public async Task<IActionResult>
        GetByInvestor(
            int investorId)
    {
        var notifications =
            await _notificationService
                .GetByInvestorIdAsync(
                    investorId);

        return Ok(
            new ApiResponse<
                IEnumerable<
                    NotificationResponseDto>>
            {
                Success = true,
                Message =
                    "Notifications retrieved successfully.",
                Data = notifications
            });
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult>
        MarkAsRead(int id)
    {
        await _notificationService
            .MarkAsReadAsync(id);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Notification marked as read."
            });
    }
}