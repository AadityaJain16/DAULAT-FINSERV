using BCrypt.Net;
using InvestFlow.Domain.Entities;
using InvestFlow.Domain.Enums;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace InvestFlow.Infrastructure.Seed;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        var adminExists = await context.Users
            .AnyAsync(x => x.Role == UserRole.ADMIN);

        if (adminExists)
            return;

        var mobile =
            configuration["ADMIN_MOBILE"];

        var password =
            configuration["ADMIN_PASSWORD"];

        if (string.IsNullOrWhiteSpace(mobile) ||
            string.IsNullOrWhiteSpace(password))
        {
            throw new InvalidOperationException(
                "Admin credentials are not configured.");
        }

        var admin = new User
        {
            FullName = "System Administrator",
            MobileNumber = mobile,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(password),
            Role = UserRole.ADMIN,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }

    
}