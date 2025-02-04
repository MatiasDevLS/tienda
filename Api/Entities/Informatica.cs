using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Data;

namespace Api.Entities
{
    [Table ("Informatica")]
    public class Informatica
    {
        [Key]
        public  string Id { get; set; }
        public  string Nombre { get; set; }
        public int Precio { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }

        public string ProductoId { get; set; }
        public Producto Producto { get; set; }
        
    }
}