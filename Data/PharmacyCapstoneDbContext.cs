using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using PharmacyCapstone.Models;
using Microsoft.AspNetCore.Identity;

namespace PharmacyCapstone.Data;
public class PharmacyCapstoneDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;

    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<RestockLog> RestockLogs { get; set; }
    public DbSet<MedicationSupplier> MedicationSuppliers { get; set; }
    public DbSet<Medication> Medications { get; set; }

    public PharmacyCapstoneDbContext(DbContextOptions<PharmacyCapstoneDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Medication>().HasData(
            new Medication { Id = 1, Name = "Amoxicillin", Manufacturer = "Apotex Corp", ExpirationDate = new DateTime(2026, 1, 1), QuantityInStock = 100, UserProfileId = 1 },
            new Medication { Id = 2, Name = "Lisinopril", Manufacturer = "Merck", ExpirationDate = new DateTime(2026, 2, 15), QuantityInStock = 150, UserProfileId = 1 },
            new Medication { Id = 3, Name = "Simvastatin", Manufacturer = "Teva Pharmaceuticals", ExpirationDate = new DateTime(2026, 3, 10), QuantityInStock = 200, UserProfileId = 1 },
            new Medication { Id = 4, Name = "Metformin", Manufacturer = "Bristol-Myers Squibb", ExpirationDate = new DateTime(2026, 4, 5), QuantityInStock = 120, UserProfileId = 1 },
            new Medication { Id = 5, Name = "Amlodipine", Manufacturer = "Pfizer", ExpirationDate = new DateTime(2026, 5, 20), QuantityInStock = 180, UserProfileId = 1 },
            new Medication { Id = 6, Name = "Atorvastatin", Manufacturer = "Apotex Corp", ExpirationDate = DateTime.Now.AddDays(25), QuantityInStock = 50, UserProfileId = 1 },
            new Medication { Id = 7, Name = "Levothyroxine", Manufacturer = "Merck", ExpirationDate = DateTime.Now.AddMonths(1), QuantityInStock = 100, UserProfileId = 1 },
            new Medication { Id = 8, Name = "Metoprolol", Manufacturer = "Teva Pharmaceuticals", ExpirationDate = DateTime.Now.AddMonths(2), QuantityInStock = 75, UserProfileId = 1 }
        );

        modelBuilder.Entity<Supplier>().HasData(
            new Supplier { Id = 1, Name = "McKesson Corporation", ContactInfo = "Jane Doe, 555-123-4567, jane.doe@mckesson.com", UserProfileId = 1 },
            new Supplier { Id = 2, Name = "Cardinal Health", ContactInfo = "John Smith, 555-987-6543, john.smith@cardinalhealth.com", UserProfileId = 1 },
            new Supplier { Id = 3, Name = "AmerisourceBergen", ContactInfo = "Alice Johnson, 555-246-8013, alice.johnson@amerisourcebergen.com", UserProfileId = 1 },
            new Supplier { Id = 4, Name = "CVS Health", ContactInfo = "Bob Williams, 555-135-7924, bob.williams@cvshealth.com", UserProfileId = 1 },
            new Supplier { Id = 5, Name = "Walgreens Boots Alliance", ContactInfo = "Emily Brown, 555-864-2057, emily.brown@walgreens.com", UserProfileId = 1 }
        );

        modelBuilder.Entity<MedicationSupplier>()
            .HasKey(ms => new { ms.MedicationId, ms.SupplierId });

        modelBuilder.Entity<MedicationSupplier>().HasData(
            new MedicationSupplier { MedicationId = 1, SupplierId = 1 },
            new MedicationSupplier { MedicationId = 2, SupplierId = 2 },
            new MedicationSupplier { MedicationId = 3, SupplierId = 3 },
            new MedicationSupplier { MedicationId = 4, SupplierId = 4 },
            new MedicationSupplier { MedicationId = 5, SupplierId = 5 }
        );

        modelBuilder.Entity<RestockLog>().HasData(
            new RestockLog { Id = 1, MedicationId = 1, SupplierId = 1, QuantityAdded = 50, DateAdded = new DateTime(2025, 6, 10), UserProfileId = 1 },
            new RestockLog { Id = 2, MedicationId = 2, SupplierId = 2, QuantityAdded = 75, DateAdded = new DateTime(2025, 6, 11), UserProfileId = 1 },
            new RestockLog { Id = 3, MedicationId = 3, SupplierId = 3, QuantityAdded = 100, DateAdded = new DateTime(2025, 6, 12), UserProfileId = 1 },
            new RestockLog { Id = 4, MedicationId = 4, SupplierId = 4, QuantityAdded = 60, DateAdded = new DateTime(2025, 6, 13), UserProfileId = 1 },
            new RestockLog { Id = 5, MedicationId = 5, SupplierId = 5, QuantityAdded = 80, DateAdded = new DateTime(2025, 6, 14), UserProfileId = 1 }
        );

    }
}