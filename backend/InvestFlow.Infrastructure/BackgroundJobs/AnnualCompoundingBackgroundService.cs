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

                var indiaTimeZone =
                    TimeZoneInfo.FindSystemTimeZoneById(
                        "Asia/Kolkata");

                var now =
                    TimeZoneInfo.ConvertTimeFromUtc(
                        DateTime.UtcNow,
                        indiaTimeZone);

                bool alreadyExecuted =
                    await context.SystemJobExecutions
                        .AnyAsync(x =>
                            x.JobName ==
                                "AnnualCompounding" &&
                            x.Year == now.Year,
                            stoppingToken);

                // Run once every April
                if (!alreadyExecuted &&
                    now.Month == 4)
                {
                    await service.CompoundAsync();

                    context.SystemJobExecutions.Add(
                        new SystemJobExecution
                        {
                            JobName =
                                "AnnualCompounding",

                            Month = 4,

                            Year = now.Year,

                            ExecutedAt = now,

                            Success = true,

                            CreatedAt = now,

                            UpdatedAt = now
                        });

                    await context.SaveChangesAsync(
                        stoppingToken);

                    _logger.LogInformation(
                        "Annual compounding completed successfully.");
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