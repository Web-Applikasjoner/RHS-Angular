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
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel loginModel)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == loginModel.Email);

        if (user == null)
        {
            return NotFound("User with this email does not exist.");
        }

        if (user.Password != loginModel.Password)
        {
            return Unauthorized("Invalid password.");
        }

        return Ok(new { message = "Login successful" });
    }

}
