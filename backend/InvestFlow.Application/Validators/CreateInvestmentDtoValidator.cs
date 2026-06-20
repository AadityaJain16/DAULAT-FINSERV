using FluentValidation;
using InvestFlow.Application.DTOs.Investment;

namespace InvestFlow.Application.Validators;

public class CreateInvestmentDtoValidator
    : AbstractValidator<CreateInvestmentDto>
{
    public CreateInvestmentDtoValidator()
    {
        RuleFor(x => x.InvestorId)
            .GreaterThan(0);

        RuleFor(x => x.Amount)
            .GreaterThan(0);

        RuleFor(x => x.InvestmentDate)
            .NotEmpty();
    }
}