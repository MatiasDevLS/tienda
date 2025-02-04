using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class cambiosIDE : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoId",
                table: "Electrodomestico");

            migrationBuilder.DropForeignKey(
                name: "FK_Informatica_Productos_ProductoId",
                table: "Informatica");

            migrationBuilder.DropIndex(
                name: "IX_Electrodomestico_ProductoId",
                table: "Electrodomestico");

            migrationBuilder.DropColumn(
                name: "ProductoId",
                table: "Electrodomestico");

            migrationBuilder.AlterColumn<string>(
                name: "ProductoId",
                table: "Informatica",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "ProductoIdE",
                table: "Electrodomestico",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Electrodomestico_ProductoIdE",
                table: "Electrodomestico",
                column: "ProductoIdE");

            migrationBuilder.AddForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoIdE",
                table: "Electrodomestico",
                column: "ProductoIdE",
                principalTable: "Productos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Informatica_Productos_ProductoId",
                table: "Informatica",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoIdE",
                table: "Electrodomestico");

            migrationBuilder.DropForeignKey(
                name: "FK_Informatica_Productos_ProductoId",
                table: "Informatica");

            migrationBuilder.DropIndex(
                name: "IX_Electrodomestico_ProductoIdE",
                table: "Electrodomestico");

            migrationBuilder.DropColumn(
                name: "ProductoIdE",
                table: "Electrodomestico");

            migrationBuilder.AlterColumn<string>(
                name: "ProductoId",
                table: "Informatica",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProductoId",
                table: "Electrodomestico",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Electrodomestico_ProductoId",
                table: "Electrodomestico",
                column: "ProductoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Electrodomestico_Productos_ProductoId",
                table: "Electrodomestico",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Informatica_Productos_ProductoId",
                table: "Informatica",
                column: "ProductoId",
                principalTable: "Productos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
