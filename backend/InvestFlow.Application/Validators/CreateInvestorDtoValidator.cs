using FluentValidation;
using InvestFlow.Application.DTOs.Investor;

namespace InvestFlow.Application.Validators;

public class CreateInvestorDtoValidator
    : AbstractValidator<CreateInvestorDto>
{
    public CreateInvestorDtoValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.MobileNumber)
            .NotEmpty()
            .Length(10);

        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(6);
    }
}