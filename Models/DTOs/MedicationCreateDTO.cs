
namespace PharmacyCapstone.Models.DTOs;
public class MedicationCreateDto
{
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int QuantityInStock { get; set; }
    public List<int> SupplierIds { get; set; }  // for many-to-many
    public int UserProfileId { get; set; }
}