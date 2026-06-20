using System.Text;
using InvestFlow.Application.Common.Settings;
using InvestFlow.Application.Interfaces.Auth;
using InvestFlow.Application.Interfaces.ActivityLog;
using InvestFlow.Application.Interfaces.Investment;
using InvestFlow.Application.Interfaces.Investor;
using InvestFlow.Application.Interfaces.InvestorPortal;
using InvestFlow.Application.Interfaces.Notification;
using InvestFlow.Application.Interfaces.ProfitEngine;
using InvestFlow.Application.Interfaces.Reports;
using InvestFlow.Application.Interfaces.Repositories;
using InvestFlow.Application.Interfaces.Withdrawal;
using InvestFlow.Infrastructure.Authentication;
using InvestFlow.Infrastructure.Data;
using InvestFlow.Infrastructure.Repositories;
using InvestFlow.Infrastructure.Services;
using InvestFlow.Infrastructure.Services.ActivityLog;
using InvestFlow.Infrastructure.Services.Investment;
using InvestFlow.Infrastructure.Services.Investor;
using InvestFlow.Infrastructure.Services.InvestorPortal;
using InvestFlow.Infrastructure.Services.Notification;
using InvestFlow.Infrastructure.Services.ProfitEngine;
using InvestFlow.Infrastructure.Services.Reports;
using InvestFlow.Infrastructure.Services.Withdrawal;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FluentValidation;
using FluentValidation.AspNetCore;
using InvestFlow.Application.Validators;
using InvestFlow.Application.Interfaces.ProfitRecords;
using InvestFlow.Infrastructure.Services.ProfitRecords;

namespace InvestFlow.API.Extensions;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JwtSettings>(
            configuration.GetSection("Jwt"));

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IJwtService, JwtService>();

        services.AddScoped<IAuthService, AuthService>();

        services.AddScoped(
            typeof(IGenericRepository<>),
            typeof(GenericRepository<>));

        services.AddScoped<IInvestorService, InvestorService>();

        services.AddScoped<IInvestmentService, InvestmentService>();

        services.AddScoped<INotificationService, NotificationService>();

        services.AddScoped<IWithdrawalService, WithdrawalService>();

        services.AddScoped<IReportService, ReportService>();

        services.AddScoped<IInvestorPortalService, InvestorPortalService>();

        services.AddScoped<IActivityLogService, ActivityLogService>();
services.AddScoped<
    IProfitRecordService,
    ProfitRecordService>();
        services.AddScoped<
            IMonthlyProfitService,
            MonthlyProfitService>();

        services.AddScoped<
            IAnnualCompoundingService,
            AnnualCompoundingService>();

        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssemblyContaining<CreateInvestorDtoValidator>();

        services.AddValidatorsFromAssemblyContaining<CreateInvestmentDtoValidator>();

        services.AddValidatorsFromAssemblyContaining<CreateWithdrawalDtoValidator>();

        var jwtSection =
            configuration.GetSection("Jwt");

        var key =
            Encoding.UTF8.GetBytes(
                jwtSection["Key"]!);

        services.AddAuthentication(
            JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer =
                            jwtSection["Issuer"],

                        ValidAudience =
                            jwtSection["Audience"],

                        IssuerSigningKey =
                            new SymmetricSecurityKey(
                                key)
                    };
            });

        services.AddAuthorization();

        return services;
    }
}