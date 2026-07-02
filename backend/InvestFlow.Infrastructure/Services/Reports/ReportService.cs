using InvestFlow.Application.DTOs.Reports;
using InvestFlow.Application.Interfaces.Reports;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.Reports;

public class ReportService : IReportService
{
    private readonly ApplicationDbContext _context;

    public ReportService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RecentActivityDto>>
        GetRecentActivityAsync(
        int count = 20)
    {
        return await _context.ActivityLogs
            .OrderByDescending(x => x.CreatedAt)
            .Take(count)
            .Select(x =>
                new RecentActivityDto
                {
                    ActivityType =
                        x.ActivityType,

                    Description =
                        x.Description,

                    ActivityDate =
    x.ActivityDate
                })
            .ToListAsync();
    }

    public async Task<DashboardSummaryDto>
        GetDashboardSummaryAsync()
    {
        return new DashboardSummaryDto
        {
            TotalInvestors =
                await _context.Investors.CountAsync(),

            TotalInvestment =
                await _context.Investors
                    .SumAsync(x => x.TotalInvested),

            TotalWithdrawals =
                await _context.Withdrawals
                    .SumAsync(x => x.Amount),

            TotalProfitEarned =
                await _context.Investors
                    .SumAsync(x => x.TotalProfitEarned),

            TotalAccumulatedInterest =
                await _context.Investors
                    .SumAsync(x => x.AccumulatedInterest),

            TotalNotifications =
                await _context.Notifications
                    .CountAsync()
        };
    }
}