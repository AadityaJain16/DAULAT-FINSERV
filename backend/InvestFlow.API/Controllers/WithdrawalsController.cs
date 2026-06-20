using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.Withdrawal;
using InvestFlow.Application.Interfaces.Withdrawal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class WithdrawalsController
    : ControllerBase
{
    private readonly
        IWithdrawalService
        _withdrawalService;

    public WithdrawalsController(
        IWithdrawalService
            withdrawalService)
    {
        _withdrawalService =
            withdrawalService;
    }

    [HttpPost]
    public async Task<IActionResult>
        Create(
            CreateWithdrawalDto request)
    {
        var result =
            await _withdrawalService
                .CreateAsync(request);

        return Ok(
            new ApiResponse<
                WithdrawalResponseDto>
            {
                Success = true,
                Message =
                    "Withdrawal created successfully.",
                Data = result
            });
    }

    [HttpGet("{investorId}")]
    public async Task<IActionResult>
        GetByInvestorId(
            int investorId)
    {
        var withdrawals =
            await _withdrawalService
                .GetByInvestorIdAsync(
                    investorId);

        return Ok(
            new ApiResponse<
                IEnumerable<WithdrawalResponseDto>>
            {
                Success = true,
                Message =
                    "Withdrawals retrieved successfully.",
                Data = withdrawals
            });
    }
}