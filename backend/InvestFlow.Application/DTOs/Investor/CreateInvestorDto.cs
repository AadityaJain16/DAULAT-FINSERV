namespace InvestFlow.Application.DTOs.Investor;

public class CreateInvestorDto
{
    public string FullName { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
}