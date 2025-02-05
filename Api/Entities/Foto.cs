using System.ComponentModel.DataAnnotations.Schema;
using Api.Data;

namespace Api.Entities
{
    [Table ("Foto")]
    public class Foto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string publicId { get; set; }

        public string ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}