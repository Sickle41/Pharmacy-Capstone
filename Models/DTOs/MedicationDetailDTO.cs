
namespace PharmacyCapstone.Models.DTOs;

public class MedicationDetailDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public DateTime ExpirationDate { get; set; }
    public int QuantityInStock { get; set; }
    public List<SupplierDto> Suppliers { get; set; }
}