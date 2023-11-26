using Microsoft.AspNetCore.Mvc;
using RHS_Angular.DAL;
using RHS_Angular.Models;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly ItemDbContext _dbContext;

    public UserController(ItemDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        // Check if the user with the same email already exists
        if (_dbContext.Users.Any(u => u.Email == user.Email))
        {
            return Conflict("User with this email already exists.");
        }

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();

        return Ok("User registered successfully.");
    }
}
