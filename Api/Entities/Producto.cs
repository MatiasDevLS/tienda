

using System.ComponentModel.DataAnnotations;
using Api.Entities;

namespace Api.Data
{
    public class Producto
    {
        [Key]
        public required string Id { get; set; }
        public required string Nombre { get; set; }
        public int Precio { get; set; }
        public string Departamento { get; set; }
        public string FotoUrl { get; set; }

        public List<Electrodomestico> Electrodomesticos { get;set;}

        public List<Informatica> Informaticas { get;set;}

        internal object Include(Func<object, object> value)
        {
            throw new NotImplementedException();
        }
    }
}