using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
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
        public async Task<ActionResult<ProductoDto>> GetProductoById(string id)
        {
            var producto = await _context.Productos.Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            if (producto.Informaticas.Count()>0){
                var PdInformatica = producto.Informaticas[0];

                var productoDto = new ProductoDto
                    {
                    Id = PdInformatica.Id,
                    Nombre = PdInformatica.Nombre,
                    Precio = PdInformatica.Precio,
                    Tipo = PdInformatica.Tipo,
                    Descripcion = PdInformatica.Descripcion,
                    Marca = PdInformatica.Marca,
                    Departamento = "Informatica"
                    };
                return  productoDto;
            }
            else{
                var PdElectrodomesticos = producto.Electrodomesticos[0];

                var productoDto = new ProductoDto
                    {
                        Id = PdElectrodomesticos.Id,
                        Nombre = PdElectrodomesticos.Nombre,
                        Precio = PdElectrodomesticos.Precio,
                        Consumo = PdElectrodomesticos.Consumo,
                        Localizacion = PdElectrodomesticos.Localizacion,
                        Descripcion = PdElectrodomesticos.Descripcion,
                        Marca = PdElectrodomesticos.Marca,
                        Departamento = "Electrodomesticos"
                    };
                return  productoDto;
            }

        }

        [HttpPost("registro")]
        public async Task<ActionResult<Producto>> Registro(ProductoDto productoDto)
        {
            if (productoDto.Departamento == "infor")
            {

                var producto = new Producto
                {
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                    Departamento = "Informatica",
                    Electrodomesticos = [],
                    Informaticas = []
                };

                var productoInfor = new Informatica
                {
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                    Tipo = productoDto.Tipo,
                    Descripcion = productoDto.Descripcion,
                    Marca = productoDto.Marca,
                    ProductoId = productoDto.Id,
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
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                    Departamento = "Electrodomestico",
                    Electrodomesticos = [],
                    Informaticas = []
                };

                var productoElec = new Electrodomestico
                {
                        Id = productoDto.Id,
                        Nombre = productoDto.Nombre,
                        Precio = productoDto.Precio,
                        Consumo = productoDto.Consumo,
                        Localizacion = productoDto.Localizacion,
                        Descripcion = productoDto.Descripcion,
                        Marca = productoDto.Marca,
                        ProductoId = productoDto.Id,
                        Producto = producto
                };
                producto.Electrodomesticos.Add(productoElec);
                
                _context.Productos.Add(producto);

                await _context.SaveChangesAsync();

                return producto;
            }
        }
    } 
}
