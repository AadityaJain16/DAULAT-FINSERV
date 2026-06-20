using InvestFlow.Application.DTOs.ProfitRecords;

namespace InvestFlow.Application.Interfaces.ProfitRecords;

public interface IProfitRecordService
{
    Task<IEnumerable<ProfitRecordDto>>
        GetByInvestorIdAsync(int investorId);

    Task<IEnumerable<ProfitRecordDto>>
        GetMyRecordsAsync(int userId);
}