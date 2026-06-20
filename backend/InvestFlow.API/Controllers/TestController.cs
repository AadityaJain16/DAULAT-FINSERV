using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InvestFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet("public")]
    public IActionResult Public()
    {
        return Ok("Public endpoint working");
    }

    [Authorize]
    [HttpGet("authenticated")]
    public IActionResult Authenticated()
    {
        return Ok("JWT authentication working");
    }

    [Authorize(Roles = "ADMIN")]
    [HttpGet("admin")]
    public IActionResult AdminOnly()
    {
        return Ok("Admin authorization working");
    }
}