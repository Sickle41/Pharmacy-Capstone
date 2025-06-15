using Microsoft.AspNetCore.Identity;

namespace PharmacyCapstone.Models;

public class Supplier
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContactInfo { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile userProfile { get; set; }
    public List<MedicationSupplier> MedicationSuppliers { get; set;}
}