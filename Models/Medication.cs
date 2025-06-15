using Microsoft.AspNetCore.Identity;

namespace PharmacyCapstone.Models;

public class Medication
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int QuantityInStock { get; set; }
    public int UserId { get; set; }
    public UserProfile UserProfile { get; set; }
    public List<MedicationSupplier> MedicationSuppliers { get; set; }
}