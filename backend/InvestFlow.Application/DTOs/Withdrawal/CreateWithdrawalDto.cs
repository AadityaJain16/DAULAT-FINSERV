namespace InvestFlow.Application.DTOs.Withdrawal;

public class CreateWithdrawalDto
{
    public int InvestorId { get; set; }

    public decimal Amount { get; set; }
}