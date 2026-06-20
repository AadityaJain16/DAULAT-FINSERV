using System.Security.Claims;
using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.ProfitRecords;
using InvestFlow.Application.Interfaces.ProfitRecords;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfitRecordsController
    : ControllerBase
{
    private readonly IProfitRecordService
        _profitRecordService;

    public ProfitRecordsController(
        IProfitRecordService profitRecordService)
    {
        _profitRecordService =
            profitRecordService;
    }

    [Authorize(Roles = "ADMIN")]
    [HttpGet("investor/{investorId}")]
    public async Task<IActionResult>
        GetByInvestor(
            int investorId)
    {
        var records =
            await _profitRecordService
                .GetByInvestorIdAsync(
                    investorId);

        return Ok(
            new ApiResponse<
                IEnumerable<ProfitRecordDto>>
            {
                Success = true,
                Message =
                    "Profit records retrieved successfully.",
                Data = records
            });
    }

    [Authorize(Roles = "INVESTOR")]
    [HttpGet("my")]
    public async Task<IActionResult>
        GetMyRecords()
    {
        var userId =
            int.Parse(
                User.FindFirstValue(
                    ClaimTypes.NameIdentifier)!);

        var records =
            await _profitRecordService
                .GetMyRecordsAsync(
                    userId);

        return Ok(
            new ApiResponse<
                IEnumerable<ProfitRecordDto>>
            {
                Success = true,
                Message =
                    "Profit records retrieved successfully.",
                Data = records
            });
    }
}