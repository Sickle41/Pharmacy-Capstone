using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PharmacyCaptsone.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicationSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c88940ef-3b1c-4f50-a424-c17f3d3577f6", "AQAAAAIAAYagAAAAEAisLQtPA9gqW9bWXjgYXI9NugyBzavyJF3XvPAwd3ZCTA3b0dXuyJRG3GPDKtgtng==", "be921260-1b27-4636-a27f-9a43b21d8664" });

            migrationBuilder.InsertData(
                table: "Medications",
                columns: new[] { "Id", "ExpirationDate", "Manufacturer", "Name", "QuantityInStock", "UserProfileId" },
                values: new object[,]
                {
                    { 6, new DateTime(2025, 7, 14, 0, 44, 34, 329, DateTimeKind.Local).AddTicks(6399), "Apotex Corp", "Atorvastatin", 50, 1 },
                    { 7, new DateTime(2025, 7, 19, 0, 44, 34, 329, DateTimeKind.Local).AddTicks(6454), "Merck", "Levothyroxine", 100, 1 },
                    { 8, new DateTime(2025, 8, 19, 0, 44, 34, 329, DateTimeKind.Local).AddTicks(6458), "Teva Pharmaceuticals", "Metoprolol", 75, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Medications",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Medications",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Medications",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "cdae6ea2-5a3d-4645-becc-b1a79a0d40ce", "AQAAAAIAAYagAAAAED3Ag3oYVu6EcVgy6892sUB6AiwhEbFtJgz3zKv8Y23GwjoixjGv+x1UVkPxhwfVPg==", "9ac62593-181c-4ca8-b0bb-cab84b2ac555" });
        }
    }
}
