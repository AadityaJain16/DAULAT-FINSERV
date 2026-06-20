using InvestFlow.Application.DTOs.Auth;

namespace InvestFlow.Application.Interfaces.Auth;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
}