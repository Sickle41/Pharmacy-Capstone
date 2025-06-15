
namespace PharmacyCapstone.Models.DTOs;

public class RestockLogCreateDto
{
    public int MedicationId { get; set; }
    public int SupplierId { get; set; }
    public int QuantityAdded { get; set; }
    public DateTime Date { get; set; }
}