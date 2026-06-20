using InvestFlow.Application.DTOs.Withdrawal;

namespace InvestFlow.Application.Interfaces.Withdrawal;

public interface IWithdrawalService
{
    Task<WithdrawalResponseDto>
        CreateAsync(CreateWithdrawalDto request);

    Task<IEnumerable<WithdrawalResponseDto>>
        GetByInvestorIdAsync(int investorId);
}