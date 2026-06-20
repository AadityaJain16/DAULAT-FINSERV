using InvestFlow.Application.DTOs.Investment;

namespace InvestFlow.Application.Interfaces.Investment;

public interface IInvestmentService
{
    Task<InvestmentResponseDto> CreateInvestmentAsync(
        CreateInvestmentDto request);

    Task<IEnumerable<InvestmentResponseDto>>
        GetByInvestorIdAsync(int investorId);
}