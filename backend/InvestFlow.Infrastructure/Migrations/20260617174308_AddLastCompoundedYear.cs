using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InvestFlow.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLastCompoundedYear : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastCompoundedYear",
                table: "Investors",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastCompoundedYear",
                table: "Investors");
        }
    }
}
