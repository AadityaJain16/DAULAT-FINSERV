using InvestFlow.Domain.Common;
using InvestFlow.Domain.Enums;

namespace InvestFlow.Domain.Entities;

public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;

    public string MobileNumber { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public UserRole Role { get; set; }

    public bool IsActive { get; set; } = true;

    public Investor? Investor { get; set; }
}