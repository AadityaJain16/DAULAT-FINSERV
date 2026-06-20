using InvestFlow.Application.DTOs.InvestorPortal;

namespace InvestFlow.Application.Interfaces.InvestorPortal;

public interface IInvestorPortalService
{
    Task<InvestorDashboardDto>
        GetDashboardAsync(int userId);

    Task<IEnumerable<InvestorInvestmentDto>>
        GetInvestmentsAsync(int userId);

    Task<IEnumerable<InvestorWithdrawalDto>>
        GetWithdrawalsAsync(int userId);

    Task<IEnumerable<InvestorProfitRecordDto>>
        GetProfitHistoryAsync(int userId);

    Task<IEnumerable<InvestorNotificationDto>>
        GetNotificationsAsync(int userId);
}