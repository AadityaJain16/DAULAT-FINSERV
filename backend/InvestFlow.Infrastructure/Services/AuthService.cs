using BCrypt.Net;
using InvestFlow.Application.DTOs.Auth;
using InvestFlow.Application.Interfaces.Auth;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace InvestFlow.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthService(
        ApplicationDbContext context,
        IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task<LoginResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x =>
                x.MobileNumber == request.MobileNumber);

        if (user == null)
        {
            throw new Exception("Invalid mobile number or password.");
        }

        var validPassword =
            BCrypt.Net.BCrypt.Verify(
                request.Password,
                user.PasswordHash);

        if (!validPassword)
        {
            throw new Exception("Invalid mobile number or password.");
        }

        var token =
            _jwtService.GenerateToken(user);

        return new LoginResponseDto
        {
            Token = token,
            FullName = user.FullName,
            MobileNumber = user.MobileNumber,
            Role = user.Role.ToString()
        };
    }
}