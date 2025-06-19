
namespace PharmacyCapstone.Models.DTOs;

public class RestockLogDto
{
    public int Id { get; set; }
    public string Medication { get; set; }
    public string Supplier { get; set; }
    public int QuantityAdded { get; set; }
    public DateTime Date { get; set; }
}