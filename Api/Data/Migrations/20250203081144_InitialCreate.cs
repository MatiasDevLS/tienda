using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Precio = table.Column<int>(type: "INTEGER", nullable: false),
                    Departamento = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Electrodomestico",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Precio = table.Column<int>(type: "INTEGER", nullable: false),
                    Consumo = table.Column<string>(type: "TEXT", nullable: false),
                    Localizacion = table.Column<string>(type: "TEXT", nullable: false),
                    Descripcion = table.Column<string>(type: "TEXT", nullable: false),
                    Marca = table.Column<string>(type: "TEXT", nullable: false),
                    ProductoId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Electrodomestico", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Electrodomestico_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Informatica",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Precio = table.Column<int>(type: "INTEGER", nullable: false),
                    Tipo = table.Column<string>(type: "TEXT", nullable: false),
                    Descripcion = table.Column<string>(type: "TEXT", nullable: false),
                    Marca = table.Column<string>(type: "TEXT", nullable: false),
                    ProductoId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Informatica", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Informatica_Productos_ProductoId",
                        column: x => x.ProductoId,
                        principalTable: "Productos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Electrodomestico_ProductoId",
                table: "Electrodomestico",
                column: "ProductoId");

            migrationBuilder.CreateIndex(
                name: "IX_Informatica_ProductoId",
                table: "Informatica",
                column: "ProductoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Electrodomestico");

            migrationBuilder.DropTable(
                name: "Informatica");

            migrationBuilder.DropTable(
                name: "Productos");
        }
    }
}
