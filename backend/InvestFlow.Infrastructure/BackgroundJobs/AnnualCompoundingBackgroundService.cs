using InvestFlow.Application.Interfaces.ProfitEngine;
using InvestFlow.Domain.Entities;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace InvestFlow.Infrastructure.BackgroundJobs;

public class AnnualCompoundingBackgroundService
    : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<AnnualCompoundingBackgroundService> _logger;

    public AnnualCompoundingBackgroundService(
        IServiceScopeFactory scopeFactory,
        ILogger<AnnualCompoundingBackgroundService> logger)
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

                var service =
                    scope.ServiceProvider
                        .GetRequiredService<IAnnualCompoundingService>();

                var year =
                    DateTime.UtcNow.Year;

                bool alreadyExecuted =
                    await context.SystemJobExecutions
                        .AnyAsync(x =>
                            x.JobName ==
                                "AnnualCompounding" &&
                            x.Year == year,
                            stoppingToken);

                if (!alreadyExecuted &&
                    DateTime.UtcNow.Month == 4)
                {
                    await service.CompoundAsync();

                    context.SystemJobExecutions.Add(
                        new SystemJobExecution
                        {
                            JobName =
                                "AnnualCompounding",

                            Month = 0,

                            Year = year,

                            ExecutedAt =
                                DateTime.UtcNow,

                            Success = true,

                            CreatedAt =
                                DateTime.UtcNow,

                            UpdatedAt =
                                DateTime.UtcNow
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
                TimeSpan.FromHours(24),
                stoppingToken);
        }
    }
}