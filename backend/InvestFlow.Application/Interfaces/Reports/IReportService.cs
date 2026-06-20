using InvestFlow.Application.DTOs.Reports;

namespace InvestFlow.Application.Interfaces.Reports;

public interface IReportService
{
    Task<DashboardSummaryDto>
        GetDashboardSummaryAsync();
        Task<IEnumerable<RecentActivityDto>>
    GetRecentActivityAsync(int count = 20);
}