using InvestFlow.Application.DTOs.Auth;
using InvestFlow.Application.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequestDto request)
    {
        var result =
            await _authService.LoginAsync(request);

        return Ok(result);
    }
}