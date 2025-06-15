
namespace PharmacyCapstone.Models.DTOs;

public class RestockLogDto
{
    public int Id { get; set; }
    public string MedicationName { get; set; }
    public string SupplierName { get; set; }
    public int QuantityAdded { get; set; }
    public DateTime Date { get; set; }
}