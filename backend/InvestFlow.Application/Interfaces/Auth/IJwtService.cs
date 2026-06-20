using InvestFlow.Domain.Entities;

namespace InvestFlow.Application.Interfaces.Auth;

public interface IJwtService
{
    string GenerateToken(User user);
}