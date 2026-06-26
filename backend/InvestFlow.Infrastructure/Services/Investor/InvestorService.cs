using BCrypt.Net;
using InvestFlow.Application.DTOs.Investor;
using InvestFlow.Application.Interfaces.Investor;
using InvestFlow.Domain.Entities;
using InvestFlow.Domain.Enums;
using InvestFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using InvestFlow.Application.Interfaces.ActivityLog;
using InvestFlow.Application.Common;
namespace InvestFlow.Infrastructure.Services.Investor;


public class InvestorService : IInvestorService
{
    private readonly ApplicationDbContext _context;
    private readonly IActivityLogService _activityLogService;

    public InvestorService(
        ApplicationDbContext context,
        IActivityLogService activityLogService)
    {
        _context = context;
        _activityLogService = activityLogService;
    }
    public async Task<
    IEnumerable<InvestorResponseDto>>
    SearchAsync(
        string keyword)
{
    return await _context.Investors
        .Include(x => x.User)
        .Where(x =>
            x.User.FullName
                .Contains(keyword)
            ||
            x.User.MobileNumber
                .Contains(keyword))
        .Select(x =>
            new InvestorResponseDto
{
    InvestorId = x.Id,
    UserId = x.UserId,
    FullName = x.User.FullName,
    MobileNumber = x.User.MobileNumber,

    TotalInvestment = x.TotalInvestment,
    TotalInvested = x.TotalInvested,
    AccumulatedInterest = x.AccumulatedInterest,
    TotalWithdrawn = x.TotalWithdrawn,
    TotalProfitEarned = x.TotalProfitEarned
})
        .ToListAsync();
}
    public async Task<PagedResult<InvestorResponseDto>>
    GetPagedAsync(
        int page,
        int pageSize)
{
    var query =
        _context.Investors
            .Include(x => x.User)
            .AsQueryable();

    var totalRecords =
        await query.CountAsync();

    var investors =
        await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(x =>
                new InvestorResponseDto
{
    InvestorId = x.Id,
    UserId = x.UserId,
    FullName = x.User.FullName,
    MobileNumber = x.User.MobileNumber,

    TotalInvestment = x.TotalInvestment,
    TotalInvested = x.TotalInvested,
    AccumulatedInterest = x.AccumulatedInterest,
    TotalWithdrawn = x.TotalWithdrawn,
    TotalProfitEarned = x.TotalProfitEarned
})
            .ToListAsync();

    return new PagedResult<InvestorResponseDto>
    {
        Items = investors,
        Page = page,
        PageSize = pageSize,
        TotalRecords = totalRecords,
        TotalPages =
            (int)Math.Ceiling(
                totalRecords /
                (double)pageSize)
    };
}

    public async Task<InvestorResponseDto>
        CreateInvestorAsync(
        CreateInvestorDto request)
    {
        
        var existingUser =
            await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.MobileNumber ==
                    request.MobileNumber);

        if (existingUser != null)
        {
            throw new Exception(
                "Mobile number already exists.");
        }

        var user = new User
        {
            FullName = request.FullName,
            MobileNumber = request.MobileNumber,
            PasswordHash =
                BCrypt.Net.BCrypt.HashPassword(
                    request.Password),
            Role = UserRole.INVESTOR,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        var investor = new Domain.Entities.Investor
        {
            UserId = user.Id,
            TotalInvestment = 0,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

       _context.Investors.Add(investor);

await _context.SaveChangesAsync();

await _activityLogService.LogAsync(
    "Investor",
    $"Investor {user.FullName} created.");

return new InvestorResponseDto
{
    InvestorId = investor.Id,
    UserId = user.Id,
    FullName = user.FullName,
    MobileNumber = user.MobileNumber,

    TotalInvestment = investor.TotalInvestment,
    TotalInvested = investor.TotalInvested,
    AccumulatedInterest = investor.AccumulatedInterest,
    TotalWithdrawn = investor.TotalWithdrawn,
    TotalProfitEarned = investor.TotalProfitEarned
};
    }
    public async Task<IEnumerable<InvestorResponseDto>>
    GetAllAsync()
{
    return await _context.Investors
        .Include(x => x.User)
        .Select(x => new InvestorResponseDto
{
    InvestorId = x.Id,
    UserId = x.UserId,
    FullName = x.User.FullName,
    MobileNumber = x.User.MobileNumber,

    TotalInvestment = x.TotalInvestment,
    TotalInvested = x.TotalInvested,
    AccumulatedInterest = x.AccumulatedInterest,
    TotalWithdrawn = x.TotalWithdrawn,
    TotalProfitEarned = x.TotalProfitEarned
})
        .ToListAsync();
}

public async Task<InvestorResponseDto?>
    GetByIdAsync(int id)
{
    var investor = await _context.Investors
        .Include(x => x.User)
        .FirstOrDefaultAsync(x => x.Id == id);

    if (investor == null)
        return null;

   return new InvestorResponseDto
{
    InvestorId = investor.Id,
    UserId = investor.UserId,
    FullName = investor.User.FullName,
    MobileNumber = investor.User.MobileNumber,

    TotalInvestment = investor.TotalInvestment,
    TotalInvested = investor.TotalInvested,
    AccumulatedInterest = investor.AccumulatedInterest,
    TotalWithdrawn = investor.TotalWithdrawn,
    TotalProfitEarned = investor.TotalProfitEarned
};
}

public async Task<InvestorResponseDto>
    UpdateAsync(
        int id,
        UpdateInvestorDto request)
{
    var investor = await _context.Investors
        .Include(x => x.User)
        .FirstOrDefaultAsync(x => x.Id == id);

    if (investor == null)
        throw new Exception("Investor not found.");

    investor.User.FullName = request.FullName;
    investor.User.MobileNumber = request.MobileNumber;

    investor.User.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return new InvestorResponseDto
{
    InvestorId = investor.Id,
    UserId = investor.UserId,
    FullName = investor.User.FullName,
    MobileNumber = investor.User.MobileNumber,

    TotalInvestment = investor.TotalInvestment,
    TotalInvested = investor.TotalInvested,
    AccumulatedInterest = investor.AccumulatedInterest,
    TotalWithdrawn = investor.TotalWithdrawn,
    TotalProfitEarned = investor.TotalProfitEarned
};
}

public async Task DeleteAsync(int id)
{
    var investor = await _context.Investors
        .Include(x => x.User)
        .FirstOrDefaultAsync(x => x.Id == id);

    if (investor == null)
        throw new Exception("Investor not found.");

    _context.Users.Remove(investor.User);

    _context.Investors.Remove(investor);

    await _context.SaveChangesAsync();
}
}