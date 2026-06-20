using InvestFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace InvestFlow.Infrastructure.Configurations;

public class InvestorConfiguration : IEntityTypeConfiguration<Investor>
{
    public void Configure(EntityTypeBuilder<Investor> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.TotalInvestment)
    .HasColumnType("decimal(18,2)");

        builder.HasOne(x => x.User)
            .WithOne(x => x.Investor)
            .HasForeignKey<Investor>(x => x.UserId);
    }
}