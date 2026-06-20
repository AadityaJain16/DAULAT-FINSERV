namespace InvestFlow.Infrastructure.Services.ProfitEngine;

public static class RoiCalculator
{
    public const decimal AnnualRoi = 7.5m;

    public const decimal MonthlyRoi =
        AnnualRoi / 100m / 12m;

    public static decimal CalculateMonthlyProfit(
        decimal profitBase)
    {
        return Math.Round(
            profitBase * MonthlyRoi,
            2,
            MidpointRounding.AwayFromZero);
    }
}