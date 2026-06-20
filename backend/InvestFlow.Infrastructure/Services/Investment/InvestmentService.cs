using InvestFlow.Application.DTOs.Investment;
using InvestFlow.Application.Interfaces.Investment;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using InvestFlow.Application.Interfaces.ActivityLog;
namespace InvestFlow.Infrastructure.Services.Investment;

public class InvestmentService : IInvestmentService
{
    private readonly IActivityLogService _activityLogService;
    private readonly ApplicationDbContext _context;

    public InvestmentService(
    ApplicationDbContext context,
    IActivityLogService activityLogService)
{
    _context = context;
    _activityLogService = activityLogService;
}

    public async Task<InvestmentResponseDto>
        CreateInvestmentAsync(
        CreateInvestmentDto request)
    {
        var investor = await _context.Investors
            .Include(x => x.User)
            .FirstOrDefaultAsync(x =>
                x.Id == request.InvestorId);

        if (investor == null)
            throw new Exception("Investor not found.");

        bool isCarryForward =
    request.InvestmentDate.Day > 5;

var investment =
    new Domain.Entities.Investment
    {
        InvestorId =
            request.InvestorId,

        Amount =
            request.Amount,

        InvestmentDate =
            request.InvestmentDate,

        IsCarryForward =
            isCarryForward,

        CreatedAt =
            DateTime.UtcNow,

        UpdatedAt =
            DateTime.UtcNow
    };

_context.Investments.Add(investment);

investor.TotalInvested +=
    request.Amount;

investor.TotalInvestment +=
    request.Amount;



        var notification =
            new Domain.Entities.Notification
            {
                InvestorId = investor.Id,
                Title = "Investment Added",
                Message =
                    $"₹{request.Amount:N2} investment added successfully.",
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

        _context.Notifications.Add(notification);
        

        await _context.SaveChangesAsync();
        await _activityLogService.LogAsync(
    "Investment",
    $"{investor.User.FullName} invested ₹{request.Amount:N2}.");

        return new InvestmentResponseDto
        {
            InvestmentId = investment.Id,
            InvestorId = investment.InvestorId,
            Amount = investment.Amount,
            InvestmentDate = investment.InvestmentDate
        };
    }

    public async Task<IEnumerable<InvestmentResponseDto>>
        GetByInvestorIdAsync(int investorId)
    {
        return await _context.Investments
            .Where(x => x.InvestorId == investorId)
            .Select(x => new InvestmentResponseDto
            {
                InvestmentId = x.Id,
                InvestorId = x.InvestorId,
                Amount = x.Amount,
                InvestmentDate = x.InvestmentDate
            })
            .ToListAsync();
    }
}