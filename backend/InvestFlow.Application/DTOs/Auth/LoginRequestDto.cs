namespace InvestFlow.Application.DTOs.Auth;

public class LoginRequestDto
{
    public string MobileNumber { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}