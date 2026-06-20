using InvestFlow.Application.DTOs.Investor;
using InvestFlow.Application.Common;
namespace InvestFlow.Application.Interfaces.Investor;

public interface IInvestorService
{
    Task<InvestorResponseDto> CreateInvestorAsync(
        CreateInvestorDto request);

    Task<IEnumerable<InvestorResponseDto>>
        GetAllAsync();

    Task<InvestorResponseDto?>
        GetByIdAsync(int id);
        Task<IEnumerable<InvestorResponseDto>>
    SearchAsync( string keyword);

    Task<InvestorResponseDto>
        UpdateAsync(
            int id,
            UpdateInvestorDto request);
            Task<PagedResult<InvestorResponseDto>>
    GetPagedAsync(
        int page,
        int pageSize);

    Task DeleteAsync(int id);
}