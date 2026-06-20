using InvestFlow.Application.Common;
using InvestFlow.Application.DTOs.Investor;
using InvestFlow.Application.Interfaces.Investor;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "ADMIN")]
public class InvestorsController : ControllerBase
{
    private readonly IInvestorService _investorService;

    public InvestorsController(
        IInvestorService investorService)
    {
        _investorService = investorService;
    }

    [HttpGet]
    public async Task<IActionResult>
        GetAll()
    {
        var investors =
            await _investorService
                .GetAllAsync();

        return Ok(
            new ApiResponse<
                IEnumerable<InvestorResponseDto>>
            {
                Success = true,
                Message =
                    "Investors retrieved successfully.",
                Data = investors
            });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult>
        GetById(int id)
    {
        var investor =
            await _investorService
                .GetByIdAsync(id);

        if (investor == null)
        {
            return NotFound(
                new ApiResponse<object>
                {
                    Success = false,
                    Message =
                        "Investor not found."
                });
        }

        return Ok(
            new ApiResponse<InvestorResponseDto>
            {
                Success = true,
                Message =
                    "Investor retrieved successfully.",
                Data = investor
            });
    }

    [HttpGet("search")]
    public async Task<IActionResult>
        Search(string keyword)
    {
        var investors =
            await _investorService
                .SearchAsync(keyword);

        return Ok(
            new ApiResponse<
                IEnumerable<InvestorResponseDto>>
            {
                Success = true,
                Message =
                    "Search completed successfully.",
                Data = investors
            });
    }

    [HttpGet("paged")]
    public async Task<IActionResult>
        GetPaged(
            int page = 1,
            int pageSize = 10)
    {
        var result =
            await _investorService
                .GetPagedAsync(
                    page,
                    pageSize);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Investors retrieved successfully.",
                Data = result
            });
    }

    [HttpPost]
    public async Task<IActionResult>
        Create(
            [FromBody]
            CreateInvestorDto request)
    {
        var result =
            await _investorService
                .CreateInvestorAsync(
                    request);

        return Ok(
            new ApiResponse<InvestorResponseDto>
            {
                Success = true,
                Message =
                    "Investor created successfully.",
                Data = result
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult>
        Update(
            int id,
            [FromBody]
            UpdateInvestorDto request)
    {
        var result =
            await _investorService
                .UpdateAsync(
                    id,
                    request);

        return Ok(
            new ApiResponse<InvestorResponseDto>
            {
                Success = true,
                Message =
                    "Investor updated successfully.",
                Data = result
            });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult>
        Delete(int id)
    {
        await _investorService
            .DeleteAsync(id);

        return Ok(
            new ApiResponse<object>
            {
                Success = true,
                Message =
                    "Investor deleted successfully."
            });
    }
}