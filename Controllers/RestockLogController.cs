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


    public RestockLogController(PharmacyCapstoneDbContext context, UserManager<IdentityUser> userManager)
    {
        _dbContext = context;

    }

    [HttpGet("RecentRestock")]

    public IActionResult GetRecentRestocks()
    {
        DateTime today = DateTime.Now;
        DateTime lastMonth = today.AddMonths(-1);
        var RestockLog = _dbContext.RestockLogs.Where(r => r.DateAdded <= today && r.DateAdded >= lastMonth)
        .Select(r => new RestockLogDto
        {
            Id = r.Id,
            Medication = r.Medication.Name,
            Supplier = r.Supplier.Name,
            QuantityAdded = r.QuantityAdded,
            Date = r.DateAdded,

        }).ToList();

        return Ok(RestockLog);
    }
}