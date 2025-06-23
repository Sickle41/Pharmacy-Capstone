
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PharmacyCapstone.Models;
using PharmacyCapstone.Models.DTOs;
using PharmacyCapstone.Data;
using Microsoft.EntityFrameworkCore;

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


    [HttpGet("{id}")]
    public IActionResult GetMedication(int id)
    {
        var medication = _dbContext.Medications.SingleOrDefault(m => m.Id == id);
        if (medication == null)
        {
            return NotFound();
        }

        var medicationDto = new MedicationDetailDto
        {
            Id = medication.Id,
            Name = medication.Name,
            Manufacturer = medication.Manufacturer,
            ExpirationDate = medication.ExpirationDate,
            QuantityInStock = medication.QuantityInStock,
            Suppliers = new List<SupplierDto>()
        };

        return Ok(medicationDto);
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

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult UpdateMedication(int id, MedicationDetailDto medicationDto)
    {
        Medication MedicationToUpdate = _dbContext.Medications.SingleOrDefault(wo => wo.Id == id);
        if (MedicationToUpdate == null)
        {
            return NotFound();
        }

        if (id != medicationDto.Id)
        {
            return BadRequest();
        }

        MedicationToUpdate.Name = medicationDto.Name;
        MedicationToUpdate.Manufacturer = medicationDto.Manufacturer;
        MedicationToUpdate.ExpirationDate = medicationDto.ExpirationDate;
        MedicationToUpdate.QuantityInStock = medicationDto.QuantityInStock;

        _dbContext.SaveChanges();

        var medicationDtoResult = new MedicationDetailDto
        {
            Id = MedicationToUpdate.Id,
            Name = MedicationToUpdate.Name,
            Manufacturer = MedicationToUpdate.Manufacturer,
            ExpirationDate = MedicationToUpdate.ExpirationDate,
            QuantityInStock = MedicationToUpdate.QuantityInStock,
            Suppliers = new List<SupplierDto>()
        };

        return Ok(medicationDtoResult);
    }


    

    private void AssociateMedicationSuppliers(int medicationId, List<int> supplierIds)
    {
        foreach (int supplierId in supplierIds)
        {
            var medication = _dbContext.Medications
                .Include(m => m.MedicationSuppliers)
                .SingleOrDefault(m => m.Id == medicationId);

            var supplier = _dbContext.Suppliers.Find(supplierId);

            if (medication != null && supplier != null)
            {
                var medicationSupplier = new MedicationSupplier
                {
                    MedicationId = medicationId,
                    SupplierId = supplierId
                };

                medication.MedicationSuppliers.Add(medicationSupplier);
            }
        }
        _dbContext.SaveChanges();
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


    [HttpPost]

    public IActionResult CreateMedication(MedicationCreateDto medicationCreateDto)
    {
        Medication medication = new()
        {
            Name = medicationCreateDto.Name,
            Manufacturer = medicationCreateDto.Manufacturer,
            ExpirationDate = medicationCreateDto.ExpirationDate,
            QuantityInStock = medicationCreateDto.QuantityInStock,
            UserProfileId = medicationCreateDto.UserProfileId
        };

        _dbContext.Medications.Add(medication);
        _dbContext.SaveChanges();

        AssociateMedicationSuppliers(medication.Id, medicationCreateDto.SupplierIds);

        return Created($"/api/medication/{medication.Id}", medication);
    }
}
