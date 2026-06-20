namespace InvestFlow.Application.Interfaces.ProfitEngine;

public interface IMonthlyProfitService
{
    Task CalculateMonthlyProfitAsync(
        int month,
        int year);
}