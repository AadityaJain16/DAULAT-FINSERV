using InvestFlow.Application.Interfaces.ProfitEngine;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.ProfitEngine;

public class AnnualCompoundingService
    : IAnnualCompoundingService
{
    private readonly ApplicationDbContext _context;

    public AnnualCompoundingService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CompoundAsync()
    {
        var indiaTimeZone =
            TimeZoneInfo.FindSystemTimeZoneById(
                "Asia/Kolkata");

        var now =
            TimeZoneInfo.ConvertTimeFromUtc(
                DateTime.UtcNow,
                indiaTimeZone);

        var currentYear =
            now.Year;

        var investors =
            await _context.Investors
                .ToListAsync();

        foreach (var investor in investors)
        {
            if (investor.LastCompoundedYear ==
                currentYear)
            {
                continue;
            }

            if (investor.AccumulatedInterest <= 0)
            {
                investor.LastCompoundedYear =
                    currentYear;

                investor.UpdatedAt = now;

                continue;
            }

            investor.TotalInvestment +=
                investor.AccumulatedInterest;

            investor.AccumulatedInterest = 0;

            investor.LastCompoundedYear =
                currentYear;

            investor.UpdatedAt = now;
        }

        await _context.SaveChangesAsync();
    }
}