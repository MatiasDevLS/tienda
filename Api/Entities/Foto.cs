using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Entities
{
    public class Foto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string publicId { get; set; }

        public string ProductoId { get; set; }
        public Producto Producto { get; set; }
    }
}