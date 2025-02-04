using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class ProductosController : BaseApiController
    {
        private readonly DataContext _context;
        public ProductosController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            var productos = await _context.Productos.ToListAsync();

            return productos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProductoById(string id)
        {
            return await _context.Productos.FindAsync(id);

        }

        [HttpPost("registro")]
        public async Task<ActionResult<Producto>> Registro(string id, string nombre, string marca, string descripcion, string localizacion, string valor , string tipo = "vacio" ,string consumo = "vacio", int precio = 0)
        {
            if (valor == "infor")
            {

                var producto = new Producto
                {
                    Id = id,
                    Nombre = nombre,
                    Precio = precio,
                    Departamento = "Informatica"
                };

                var productoInfor = new Informatica
                {
                    Id = id,
                    Nombre = nombre,
                    Precio = precio,
                    Tipo = tipo,
                    Descripcion = descripcion,
                    Marca = marca,
                    ProductoId = id,
                    Producto = producto

                };

                producto.Informaticas.Add(productoInfor);
                _context.Productos.Add(producto);
                await _context.SaveChangesAsync();

                return producto;
            }
            else{

                var producto = new Producto
                {
                    Id = id,
                    Nombre = nombre,
                    Precio = precio,
                    Departamento = "Electrodomestico",
                    Electrodomesticos = []
                };

                var productoElec = new Electrodomestico
                {
                        Id = id,
                        Nombre = nombre,
                        Precio = precio,
                        Consumo = consumo,
                        Localizacion = localizacion,
                        Descripcion = descripcion,
                        Marca = marca,
                        ProductoId = id
                };
                
                producto.Electrodomesticos.Add(productoElec);
                _context.Productos.Add(producto);

                await _context.SaveChangesAsync();

                return producto;
            }
        }
    } 
}
