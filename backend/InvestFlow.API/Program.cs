using InvestFlow.API.Extensions;
using InvestFlow.Infrastructure.Data;
using InvestFlow.Infrastructure.Seed;
using InvestFlow.API.Middleware;
using InvestFlow.Infrastructure.BackgroundJobs;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:5173","http://localhost:4173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(
    builder.Configuration);
builder.Services.AddHostedService<
    MonthlyProfitBackgroundService>();

builder.Services.AddHostedService<
    AnnualCompoundingBackgroundService>();
var app = builder.Build();
app.UseCors("Frontend");

using (var scope = app.Services.CreateScope())
{
    var dbContext =
        scope.ServiceProvider
            .GetRequiredService<ApplicationDbContext>();

    await dbContext.Database.MigrateAsync();

    await AdminSeeder.SeedAdminAsync(dbContext);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();