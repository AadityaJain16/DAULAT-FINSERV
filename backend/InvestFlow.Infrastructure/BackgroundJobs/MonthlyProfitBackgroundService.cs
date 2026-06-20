using InvestFlow.Application.Interfaces.ProfitEngine;
using InvestFlow.Domain.Entities;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
namespace InvestFlow.Infrastructure.BackgroundJobs;

public class MonthlyProfitBackgroundService
    : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<MonthlyProfitBackgroundService> _logger;
    public MonthlyProfitBackgroundService(
        IServiceScopeFactory scopeFactory,
        ILogger<MonthlyProfitBackgroundService> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope =
                    _scopeFactory.CreateScope();

                var context =
                    scope.ServiceProvider
                        .GetRequiredService<ApplicationDbContext>();

                var profitService =
                    scope.ServiceProvider
                        .GetRequiredService<IMonthlyProfitService>();

                var targetDate =
                    DateTime.UtcNow.AddMonths(-1);

                bool alreadyExecuted =
                    await context.SystemJobExecutions
                        .AnyAsync(x =>
                            x.JobName == "MonthlyProfit" &&
                            x.Month == targetDate.Month &&
                            x.Year == targetDate.Year,
                            stoppingToken);

                if (!alreadyExecuted)
                {
                    await profitService
                        .CalculateMonthlyProfitAsync(
                            targetDate.Month,
                            targetDate.Year);

                    context.SystemJobExecutions.Add(
                        new SystemJobExecution
                        {
                            JobName = "MonthlyProfit",
                            Month = targetDate.Month,
                            Year = targetDate.Year,
                            ExecutedAt = DateTime.UtcNow,
                            Success = true,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        });

                    await context.SaveChangesAsync(
                        stoppingToken);
                }
            }
            catch (Exception ex)
{
    _logger.LogError(
        ex,
        "Annual compounding job failed");
}

            await Task.Delay(
                TimeSpan.FromHours(6),
                stoppingToken);
        }
    }
}