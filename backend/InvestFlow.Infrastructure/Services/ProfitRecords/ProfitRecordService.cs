using InvestFlow.Application.DTOs.ProfitRecords;
using InvestFlow.Application.Interfaces.ProfitRecords;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services.ProfitRecords;

public class ProfitRecordService
    : IProfitRecordService
{
    private readonly ApplicationDbContext _context;

    public ProfitRecordService(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProfitRecordDto>>
        GetByInvestorIdAsync(
            int investorId)
    {
        return await _context.ProfitRecords
            .Where(x =>
                x.InvestorId == investorId)
            .OrderByDescending(x => x.Year)
            .ThenByDescending(x => x.Month)
            .Select(x =>
                new ProfitRecordDto
                {
                    Month = x.Month,
                    Year = x.Year,
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

    public async Task<IEnumerable<ProfitRecordDto>>
        GetMyRecordsAsync(
            int userId)
    {
        var investor =
            await _context.Investors
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId);

        if (investor == null)
        {
            throw new Exception(
                "Investor not found.");
        }

        return await GetByInvestorIdAsync(
            investor.Id);
    }
}