using Microsoft.AspNetCore.Identity;

namespace PharmacyCapstone.Models;

public class RestockLog
{
    public int Id { get; set; }
    public int MedicationId { get; set; }
    public Medication Medication { get; set; }
    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    public int QuantityAdded { get; set; }
    public DateTime DateAdded { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile UserProfile{ get; set; }
}