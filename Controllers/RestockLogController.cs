using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using PharmacyCapstone.Models;
using PharmacyCapstone.Models.DTOs;
using PharmacyCapstone.Data;

namespace PharmacyCapstone.Controllers;

[ApiController]
[Route("api/[controller]")]

public class RestockLogController : ControllerBase
{
     private PharmacyCapstoneDbContext _dbContext;
    private UserManager<IdentityUser> _userManager;

    public RestockLogController(PharmacyCapstoneDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }
}