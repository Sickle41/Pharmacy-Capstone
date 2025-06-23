
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PharmacyCapstone.Models;
using PharmacyCapstone.Models.DTOs;
using PharmacyCapstone.Data;
using Microsoft.EntityFrameworkCore;

namespace PharmacyCapstone.Controllers;

[ApiController]
[Route("api/[controller]")]

public class SupplierController : ControllerBase
{
    private PharmacyCapstoneDbContext _dbContext;

    public SupplierController(PharmacyCapstoneDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]

    public IActionResult GetSuppliers()
    {
        return Ok(_dbContext.Suppliers.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult GetSupplier(int id)
    {
        var supplier = _dbContext.Suppliers.SingleOrDefault(m => m.Id == id);
        if (supplier == null)
        {
            return NotFound();
        }

        var supplierDto = new SupplierDto
        {
            Id = supplier.Id,
            Name = supplier.Name,
            ContactInfo = supplier.ContactInfo,
        };

        return Ok(supplierDto);
    }

    [HttpDelete("{id}")]

    public IActionResult DeleteSupplier(int id)
    {
        {
            var supplier = _dbContext.Suppliers.SingleOrDefault(s => s.Id == id);
            if (supplier == null)
            {
                return NotFound();
            }
            _dbContext.Remove(supplier);
            _dbContext.SaveChanges();

            return NoContent();
        }
    }

    [HttpPost]

    public IActionResult CreateSupplier(SupplierCreateDto supplierCreateDto)
    {
        Supplier supplier = new()
        {
            Name = supplierCreateDto.Name,
            ContactInfo = supplierCreateDto.ContactInfo,
            UserProfileId = supplierCreateDto.UserProfileId
        };

        _dbContext.Suppliers.Add(supplier);
        _dbContext.SaveChanges();


        return Created($"/api/supplier/{supplier.Id}", supplier);
    }
}