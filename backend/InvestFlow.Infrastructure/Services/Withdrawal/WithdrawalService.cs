using InvestFlow.Application.DTOs.Withdrawal;
using InvestFlow.Application.Interfaces.Withdrawal;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using InvestFlow.Application.Interfaces.ActivityLog;

namespace InvestFlow.Infrastructure.Services.Withdrawal;


public class WithdrawalService : IWithdrawalService
{
    private readonly ApplicationDbContext _context;
    private readonly IActivityLogService _activityLogService;

    public WithdrawalService(
        ApplicationDbContext context,
        IActivityLogService activityLogService)
    {
        _context = context;
        _activityLogService = activityLogService;
    }

    public async Task<WithdrawalResponseDto>
        CreateAsync(
        CreateWithdrawalDto request)
    {
       var investor = await _context.Investors
    .Include(x => x.User)
    .FirstOrDefaultAsync(x =>
        x.Id == request.InvestorId);

        if (investor == null)
            throw new Exception("Investor not found.");

        if (request.Amount <= 0)
            throw new Exception(
                "Withdrawal amount must be greater than zero.");

        if (request.Amount >
            investor.TotalInvestment)
        {
            throw new Exception(
                "Insufficient investment balance.");
        }

        var withdrawal =
            new Domain.Entities.Withdrawal
            {
                InvestorId = investor.Id,
                Amount = request.Amount,
                WithdrawalDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

        _context.Withdrawals.Add(withdrawal);
investor.TotalInvestment -=
    request.Amount;

investor.TotalWithdrawn +=
    request.Amount;

        _context.Notifications.Add(
            new Domain.Entities.Notification
            {
                InvestorId = investor.Id,
                Title = "Withdrawal Processed",
                Message =
                    $"₹{request.Amount:N2} withdrawn successfully.",
                IsRead = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });
            await _activityLogService.LogAsync(
    "Withdrawal",
    $"{investor.User.FullName} withdrew ₹{request.Amount:N2}.");

        await _context.SaveChangesAsync();

        return new WithdrawalResponseDto
        {
            WithdrawalId = withdrawal.Id,
            InvestorId = withdrawal.InvestorId,
            Amount = withdrawal.Amount,
            WithdrawalDate =
                withdrawal.WithdrawalDate
        };
    }

    public async Task<IEnumerable<WithdrawalResponseDto>>
        GetByInvestorIdAsync(
        int investorId)
    {
        return await _context.Withdrawals
            .Where(x =>
                x.InvestorId == investorId)
            .OrderByDescending(x =>
                x.WithdrawalDate)
            .Select(x =>
                new WithdrawalResponseDto
                {
                    WithdrawalId = x.Id,
                    InvestorId = x.InvestorId,
                    Amount = x.Amount,
                    WithdrawalDate =
                        x.WithdrawalDate
                })
            .ToListAsync();
    }
}