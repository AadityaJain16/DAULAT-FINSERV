namespace InvestFlow.Application.DTOs.Withdrawal;

public class WithdrawalResponseDto
{
    public int WithdrawalId { get; set; }

    public int InvestorId { get; set; }

    public decimal Amount { get; set; }

    public DateTime WithdrawalDate { get; set; }
}