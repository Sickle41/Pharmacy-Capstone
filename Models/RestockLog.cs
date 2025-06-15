using Microsoft.AspNetCore.Identity;

namespace PharmacyCapstone.Models;

public class RestockLog
{
    public int Id { get; set; }
    public Medication MedicationId { get; set; }
    public Supplier SupplierId { get; set; }
    public int QuantityAdded { get; set; }
    public DateTime DateAdded { get; set; }
    public UserProfile UserProfile{ get; set; }
}