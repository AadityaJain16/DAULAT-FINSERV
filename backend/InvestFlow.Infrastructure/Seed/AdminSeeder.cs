using BCrypt.Net;
using InvestFlow.Domain.Entities;
using InvestFlow.Domain.Enums;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Seed;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(
        ApplicationDbContext context)
    {
        var adminExists = await context.Users
            .AnyAsync(x => x.Role == UserRole.ADMIN);

        if (adminExists)
            return;

        var admin = new User
        {
            FullName = "System Administrator",
            MobileNumber = "9999999999",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = UserRole.ADMIN,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }
}