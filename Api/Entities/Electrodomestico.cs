using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Data;

namespace Api.Entities
{
    [Table ("Electrodomestico")]
    public class Electrodomestico
    {
        [Key]
        public  string Id { get; set; }
        public  string Nombre { get; set; }
        public float Precio { get; set; }
        public string Consumo { get; set; }
        public string Localizacion { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public string FotoUrl { get; set; }

        public string ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}