using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class ProductoDto
    {
        public  string Id { get; set; }
        public  string Nombre { get; set; }
        public int Precio { get; set; }
        public string Departamento { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public string Marca { get; set; }
        public string Consumo { get; set; }
        public string Localizacion { get; set; }
    }
}