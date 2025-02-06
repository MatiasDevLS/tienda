using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Interfaces;
using Api.Services;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class ProductosController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IFotoService _fotoService;
        public ProductosController(DataContext context, IFotoService fotoService)
        {
            _fotoService = fotoService;
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
            var producto = await _context.Productos.Include(p => p.Electrodomesticos).Include(a => a.Informaticas).Include(f => f.Fotos).SingleOrDefaultAsync(x => x.Id == id);

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
                    Departamento = "Informatica",
                    FotoUrl = producto.Fotos[0].Url
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
                        Departamento = "Electrodomesticos",
                        FotoUrl = producto.Fotos[0].Url
                    };
                return  productoDto;
            }

        }

        [HttpPost("registro")]
        public async Task<ActionResult<Producto>> Registro(ProductoDto productoDto)
        {
            if (productoDto.Departamento == "Infor")
            {

                var producto = new Producto
                {
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                    Departamento = "Informatica",
                    Fotos= [],
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
                    Fotos= [],
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

        [HttpDelete("borrar/{id}")]
        public async Task<ActionResult> DeleteProducto (string id)
        {
            var producto = await _context.Productos.Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);
            
            _context.Productos.Remove(producto);
            
            await _context.SaveChangesAsync();
            
            return Ok();   
            
        }

        [HttpPost("cambios")]
        public async Task<ActionResult> UpdateUser( ProductoDto productoDto)
        {
            var productoActualizar = await _context.Productos.Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == productoDto.Id);

            _context.Productos.Remove(await _context.Productos.Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == productoDto.Id));

            await _context.SaveChangesAsync();

            productoActualizar.Nombre = productoDto.Nombre;
            productoActualizar.Precio = productoDto.Precio;
            if (productoDto.Departamento == "Electrodomesticos"){
                productoActualizar.Electrodomesticos[0].Descripcion = productoDto.Descripcion;
                productoActualizar.Electrodomesticos[0].Marca = productoDto.Marca;
                productoActualizar.Electrodomesticos[0].FotoUrl = productoDto.FotoUrl;
                productoActualizar.Electrodomesticos[0].Consumo = productoDto.Consumo;
                productoActualizar.Electrodomesticos[0].Localizacion = productoDto.Localizacion;
            }
            else{
                productoActualizar.Informaticas[0].Descripcion = productoDto.Descripcion;
                productoActualizar.Informaticas[0].Marca = productoDto.Marca;
                productoActualizar.Informaticas[0].FotoUrl = productoDto.FotoUrl;
                productoActualizar.Informaticas[0].Tipo = productoDto.Tipo;
            }
            
            _context.Productos.Add(productoActualizar);
            
            await _context.SaveChangesAsync();

            return Ok();

            
        }

        [HttpPost("add-foto/{id}")]
        public async Task<ActionResult> AddFoto(string id, IFormFile file)
        {
            var result = await _fotoService.AddPhotoAsync(file);

             var producto = await _context.Productos.Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            var foto = new Foto
            {
                
                Url = result.SecureUrl.AbsoluteUri,
                publicId = result.PublicId,
                ProductoId = producto.Id,
                Producto = producto
            };
            
            var productoFoto = producto;

            _context.Productos.Remove(producto);

            await _context.SaveChangesAsync();
            
            productoFoto.Fotos = [];

            productoFoto.Fotos.Add(foto);

            _context.Productos.Add(productoFoto);

            await _context.SaveChangesAsync();

            return Ok();
        }
    } 
}
