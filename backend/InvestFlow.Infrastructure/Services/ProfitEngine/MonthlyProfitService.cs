using InvestFlow.Application.Interfaces.ActivityLog;
using InvestFlow.Application.Interfaces.ProfitEngine;
using InvestFlow.Domain.Entities;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.ProfitEngine;

public class MonthlyProfitService
    : IMonthlyProfitService
{
    private readonly ApplicationDbContext _context;
    private readonly IActivityLogService _activityLogService;

    public MonthlyProfitService(
        ApplicationDbContext context,
        IActivityLogService activityLogService)
    {
        _context = context;
        _activityLogService = activityLogService;
    }

    public async Task CalculateMonthlyProfitAsync(
        int month,
        int year)
    {
        var investors =
            await _context.Investors
                .Include(x => x.User)
                .Include(x => x.Investments)
                .Include(x => x.Withdrawals)
                .ToListAsync();

        foreach (var investor in investors)
        {
            bool alreadyCalculated =
                await _context.ProfitRecords
                    .AnyAsync(x =>
                        x.InvestorId == investor.Id &&
                        x.Month == month &&
                        x.Year == year);

            if (alreadyCalculated)
                continue;

           var previousRecord =
    await _context.ProfitRecords
        .Where(x =>
            x.InvestorId == investor.Id)
        .OrderByDescending(x => x.Year)
        .ThenByDescending(x => x.Month)
        .FirstOrDefaultAsync();

decimal openingPrincipal =
    previousRecord?.ClosingPrincipal
    ?? investor.TotalInvestment;

            decimal carryForward =
                investor.PendingInvestmentCarryForward;

            decimal investmentsBefore5th =
                investor.Investments
                    .Where(x =>
                        x.InvestmentDate.Year == year &&
                        x.InvestmentDate.Month == month &&
                        x.InvestmentDate.Day <= 5)
                    .Sum(x => x.Amount);

            decimal withdrawals =
                investor.Withdrawals
                    .Where(x =>
                        x.WithdrawalDate.Year == year &&
                        x.WithdrawalDate.Month == month)
                    .Sum(x => x.Amount);

            decimal lateInvestments =
                investor.Investments
                    .Where(x =>
                        x.InvestmentDate.Year == year &&
                        x.InvestmentDate.Month == month &&
                        x.InvestmentDate.Day > 5)
                    .Sum(x => x.Amount);

            decimal profitBase =
                openingPrincipal +
                carryForward +
                investmentsBefore5th -
                withdrawals;

            decimal monthlyProfit =
                RoiCalculator.CalculateMonthlyProfit(
                    profitBase);

            investor.AccumulatedInterest +=
                monthlyProfit;

            investor.TotalProfitEarned +=
                monthlyProfit;

            investor.PendingInvestmentCarryForward =
                lateInvestments;

            var record =
                new ProfitRecord
                {
                    InvestorId = investor.Id,

                    Month = month,

                    Year = year,

                    OpeningPrincipal =
                        openingPrincipal,

                    ProfitBase =
                        profitBase,

                    MonthlyProfit =
                        monthlyProfit,

                    ClosingPrincipal =
                        profitBase,
                        

                    CalculationDate =
                        DateTime.UtcNow,

                    CreatedAt =
                        DateTime.UtcNow,

                    UpdatedAt =
                        DateTime.UtcNow
                };

            _context.ProfitRecords.Add(record);

            _context.Notifications.Add(
    new InvestFlow.Domain.Entities.Notification
    {
        InvestorId = investor.Id,
        Title = "Monthly Profit Generated",
        Message =
            $"Profit of ₹{monthlyProfit:N2} generated for {month}/{year}.",
        IsRead = false,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    });

            await _activityLogService.LogAsync(
                "Monthly Profit Calculation",
                $"₹{monthlyProfit:N2} profit generated for {investor.User.FullName}");
        }

        await _context.SaveChangesAsync();
    }
    public async Task RecalculateInvestorProfitAsync(
    int investorId)
{
    var investor =
        await _context.Investors
            .Include(x => x.Investments)
            .Include(x => x.Withdrawals)
            .Include(x => x.ProfitRecords)
            .FirstOrDefaultAsync(x =>
                x.Id == investorId);

    if (investor == null)
        return;

    var existingRecords =
        await _context.ProfitRecords
            .Where(x =>
                x.InvestorId == investorId)
            .ToListAsync();

    _context.ProfitRecords.RemoveRange(
        existingRecords);

    investor.AccumulatedInterest = 0;
    investor.TotalProfitEarned = 0;
    investor.PendingInvestmentCarryForward = 0;

    await _context.SaveChangesAsync();

    var firstInvestment =
        investor.Investments
            .OrderBy(x => x.InvestmentDate)
            .FirstOrDefault();

    if (firstInvestment == null)
        return;

    var startDate =
        new DateTime(
            firstInvestment.InvestmentDate.Year,
            firstInvestment.InvestmentDate.Month,
            1);

    var currentDate =
        DateTime.UtcNow;

    var endDate =
        new DateTime(
            currentDate.Year,
            currentDate.Month,
            1);

    while (startDate <= endDate)
    {
        await CalculateMonthlyProfitAsync(
            startDate.Month,
            startDate.Year);

        startDate =
            startDate.AddMonths(1);
    }
}

    Task IMonthlyProfitService.CalculateMonthlyProfitAsync(int month, int year)
    {
        throw new NotImplementedException();
    }

    Task IMonthlyProfitService.RecalculateInvestorProfitAsync(int investorId, int fromMonth, int fromYear)
    {
        throw new NotImplementedException();
    }
}