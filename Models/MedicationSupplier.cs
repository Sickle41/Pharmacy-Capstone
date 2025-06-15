

namespace PharmacyCapstone.Models;

public class MedicationSupplier
{
    public int MedicationId { get; set; }
    public Medication Medication { get; set; }

    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; }
}