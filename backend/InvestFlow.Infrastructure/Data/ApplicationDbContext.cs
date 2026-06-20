using InvestFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Investor> Investors => Set<Investor>();

    public DbSet<Investment> Investments => Set<Investment>();

    public DbSet<ProfitRecord> ProfitRecords
        => Set<ProfitRecord>();

    public DbSet<Withdrawal> Withdrawals
        => Set<Withdrawal>();

    public DbSet<Notification> Notifications
        => Set<Notification>();

    public DbSet<ActivityLog> ActivityLogs
        => Set<ActivityLog>();
public DbSet<SystemJobExecution> SystemJobExecutions
    => Set<SystemJobExecution>();
    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        modelBuilder
            .ApplyConfigurationsFromAssembly(
                typeof(ApplicationDbContext)
                    .Assembly);

        base.OnModelCreating(modelBuilder);
modelBuilder.Entity<SystemJobExecution>()
    .HasIndex(x => new
    {
        x.JobName,
        x.Month,
        x.Year
    })
    .IsUnique();
        modelBuilder.Entity<Investor>()
            .Property(x => x.TotalInvestment)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investor>()
            .Property(x => x.AccumulatedInterest)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investor>()
            .Property(x => x.TotalProfitEarned)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investor>()
            .Property(x => x.TotalInvested)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investor>()
            .Property(x => x.TotalWithdrawn)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investor>()
            .Property(x => x.PendingInvestmentCarryForward)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Investment>()
            .Property(x => x.Amount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Withdrawal>()
            .Property(x => x.Amount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProfitRecord>()
            .Property(x => x.OpeningPrincipal)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProfitRecord>()
            .Property(x => x.ProfitBase)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProfitRecord>()
            .Property(x => x.MonthlyProfit)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProfitRecord>()
            .Property(x => x.ClosingPrincipal)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProfitRecord>()
            .HasIndex(x => new
            {
                x.InvestorId,
                x.Month,
                x.Year
            })
            .IsUnique();
    }
}