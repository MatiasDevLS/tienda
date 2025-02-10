using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Data;

namespace Api.Entities
{
    [Table ("Stock")]
    public class Stock
    {
        [Key]
        public string Contador { get; set; }
        public float Precio { get; set; }
        public bool Vendido { get; set; }
        public bool EnVenta { get; set; }

        public string ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}