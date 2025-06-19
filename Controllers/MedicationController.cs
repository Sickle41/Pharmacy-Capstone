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

public class MedicationController : ControllerBase
{
    private PharmacyCapstoneDbContext _dbContext;

    public MedicationController(PharmacyCapstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]

    public IActionResult GetMedications()
    {
        return Ok(_dbContext.Medications.ToList());
    }

    [HttpDelete("{id}")]

    public IActionResult DeleteMedication(int id)
    {
        {
            var medication = _dbContext.Medications.SingleOrDefault(m => m.Id == id);
            if (medication == null)
            {
                return NotFound();
            }
            _dbContext.Remove(medication);
            _dbContext.SaveChanges();

            return NoContent();
        }
    }

    [HttpGet("ExpiringNextMonth")]

    public IActionResult GetExpiringMedications()
    {
        DateTime today = DateTime.Now;
        DateTime nextMonth = today.AddMonths(1);
        var medication = _dbContext.Medications.Where(m => m.ExpirationDate >= today && m.ExpirationDate <= nextMonth)
        .Select(m => new MedicationDetailDto
        {
            Id = m.Id,
            Name = m.Name,
            Manufacturer = m.Manufacturer,
            ExpirationDate = m.ExpirationDate,
            QuantityInStock = m.QuantityInStock,

        }).ToList();

        return Ok(medication);
    }
}
