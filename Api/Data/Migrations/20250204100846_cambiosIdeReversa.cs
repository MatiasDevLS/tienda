using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class cambiosIdeReversa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoIdE",
                table: "Electrodomestico");

            migrationBuilder.RenameColumn(
                name: "ProductoIdE",
                table: "Electrodomestico",
                newName: "ProductoId");

            migrationBuilder.RenameIndex(
                name: "IX_Electrodomestico_ProductoIdE",
                table: "Electrodomestico",
                newName: "IX_Electrodomestico_ProductoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoId",
                table: "Electrodomestico",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoId",
                table: "Electrodomestico");

            migrationBuilder.RenameColumn(
                name: "ProductoId",
                table: "Electrodomestico",
                newName: "ProductoIdE");

            migrationBuilder.RenameIndex(
                name: "IX_Electrodomestico_ProductoId",
                table: "Electrodomestico",
                newName: "IX_Electrodomestico_ProductoIdE");

            migrationBuilder.AddForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoIdE",
                table: "Electrodomestico",
                column: "ProductoIdE",
                principalTable: "Productos",
                principalColumn: "Id");
        }
    }
}
