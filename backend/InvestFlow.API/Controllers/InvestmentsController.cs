using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.Investment;
using InvestFlow.Application.Interfaces.Investment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class InvestmentsController
    : ControllerBase
{
    private readonly
        IInvestmentService
        _investmentService;

    public InvestmentsController(
        IInvestmentService
            investmentService)
    {
        _investmentService =
            investmentService;
    }

    [HttpPost]
    public async Task<IActionResult>
        Create(
            [FromBody]
            CreateInvestmentDto request)
    {
        var result =
            await _investmentService
                .CreateInvestmentAsync(
                    request);

        return Ok(
            new ApiResponse<
                InvestmentResponseDto>
            {
                Success = true,
                Message =
                    "Investment created successfully.",
                Data = result
            });
    }

    [HttpGet("{investorId}")]
    public async Task<IActionResult>
        GetByInvestor(
            int investorId)
    {
        var investments =
            await _investmentService
                .GetByInvestorIdAsync(
                    investorId);

        return Ok(
            new ApiResponse<
                IEnumerable<
                    InvestmentResponseDto>>
            {
                Success = true,
                Message =
                    "Investments retrieved successfully.",
                Data = investments
            });
    }
}