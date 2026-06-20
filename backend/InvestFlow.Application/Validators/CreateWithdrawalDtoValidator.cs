using FluentValidation;
using InvestFlow.Application.DTOs.Withdrawal;

namespace InvestFlow.Application.Validators;

public class CreateWithdrawalDtoValidator
    : AbstractValidator<CreateWithdrawalDto>
{
    public CreateWithdrawalDtoValidator()
    {
        RuleFor(x => x.InvestorId)
            .GreaterThan(0);

        RuleFor(x => x.Amount)
            .GreaterThan(0);
    }
}