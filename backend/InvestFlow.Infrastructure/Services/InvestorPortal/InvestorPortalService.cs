using InvestFlow.Application.DTOs.InvestorPortal;
using InvestFlow.Application.Interfaces.InvestorPortal;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.InvestorPortal;

public class InvestorPortalService
    : IInvestorPortalService
{
    private readonly ApplicationDbContext _context;

    public InvestorPortalService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<InvestorDashboardDto>
        GetDashboardAsync(int userId)
    {
        var investor = await _context.Investors
            .Include(x => x.User)
            .Include(x => x.Investments)
            .Include(x => x.Withdrawals)
            .Include(x => x.ProfitRecords)
            .Include(x => x.Notifications)
            .FirstOrDefaultAsync(
                x => x.UserId == userId);

        if (investor == null)
            throw new Exception(
                "Investor not found.");

        return new InvestorDashboardDto
        {
            FullName =
                investor.User.FullName,

            MobileNumber =
                investor.User.MobileNumber,

            TotalInvestment =
                investor.TotalInvestment,

            AccumulatedInterest =
                investor.AccumulatedInterest,

            TotalProfitEarned =
                investor.TotalProfitEarned,

            TotalInvestments =
                investor.Investments.Count,

            TotalWithdrawals =
                investor.Withdrawals.Count,

            TotalProfitRecords =
                investor.ProfitRecords.Count,

            TotalNotifications =
                investor.Notifications.Count,
                TotalInvested =
    investor.TotalInvested,

TotalWithdrawn =
    investor.TotalWithdrawn
        };
    }

    public async Task<IEnumerable<InvestorInvestmentDto>>
        GetInvestmentsAsync(int userId)
    {
        return await _context.Investments
            .Where(x =>
                x.Investor.UserId == userId)
            .OrderByDescending(x =>
                x.InvestmentDate)
            .Select(x =>
                new InvestorInvestmentDto
                {
                    Amount = x.Amount,
                    InvestmentDate =
                        x.InvestmentDate
                })
            .ToListAsync();
    }

    public async Task<IEnumerable<InvestorWithdrawalDto>>
        GetWithdrawalsAsync(int userId)
    {
        return await _context.Withdrawals
            .Where(x =>
                x.Investor.UserId == userId)
            .OrderByDescending(x =>
                x.WithdrawalDate)
            .Select(x =>
                new InvestorWithdrawalDto
                {
                    Amount = x.Amount,
                    WithdrawalDate =
                        x.WithdrawalDate
                })
            .ToListAsync();
    }

    public async Task<IEnumerable<InvestorProfitRecordDto>>
        GetProfitHistoryAsync(int userId)
    {
        return await _context.ProfitRecords
            .Where(x =>
                x.Investor.UserId == userId)
            .OrderByDescending(x => x.Year)
            .ThenByDescending(x => x.Month)
            .Select(x =>
                new InvestorProfitRecordDto
                {
                    Month =
                        x.Month,

                    Year =
                        x.Year,

                    OpeningPrincipal =
                        x.OpeningPrincipal,

                    ProfitBase =
                        x.ProfitBase,

                    MonthlyProfit =
                        x.MonthlyProfit,

                    ClosingPrincipal =
                        x.ClosingPrincipal,

                    CalculationDate =
                        x.CalculationDate
                })
            .ToListAsync();
    }

    public async Task<IEnumerable<
        InvestorNotificationDto>>
        GetNotificationsAsync(
        int userId)
    {
        return await _context.Notifications
            .Where(x =>
                x.Investor.UserId == userId)
            .OrderByDescending(x =>
                x.CreatedAt)
            .Select(x =>
                new InvestorNotificationDto
                {
                    Title = x.Title,
                    Message = x.Message,
                    IsRead = x.IsRead,
                    CreatedAt = x.CreatedAt
                })
            .ToListAsync();
    }
}