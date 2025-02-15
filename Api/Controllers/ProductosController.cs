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

        [HttpGet("comprar")]
        public async Task<ActionResult<List<ProductoDto>>> GetProductosEnVenta()
        {
            var productos = await _context.Productos.Include(p => p.Stocks).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).Include(f => f.Fotos).ToListAsync();
            List<ProductoDto> productosEnVenta= [];
            foreach (var item in productos)
            {
                if (item.Stocks.FirstOrDefault(x => x.EnVenta == true)!=null){
                    if (item.Informaticas.Count()>0){
                var PdInformatica = item.Informaticas[0];

                var productoDto = new ProductoDto
                    {
                    Id = item.Id,
                    Nombre = item.Nombre,
                    Precio = item.Precio,
                    Tipo = PdInformatica.Tipo,
                    Descripcion = PdInformatica.Descripcion,
                    Marca = PdInformatica.Marca,
                    Departamento = "Informatica",
                    FotoUrl = item.Fotos[0].Url,
                    Stocks = item.Stocks.FindAll(x => x.Vendido==false).Count(),
                    CantidadVendidos = item.Stocks.FindAll(x => x.Vendido==true).Count(),
                    CantidadVenta = item.Stocks.FindAll(x => x.EnVenta==true).Count(),
                    Ganancias = item.Ganancias
                    };
                productosEnVenta.Add(productoDto);
            }
            else{
                var PdElectrodomesticos = item.Electrodomesticos[0];

                var productoDto = new ProductoDto
                    {
                        Id = item.Id,
                        Nombre = item.Nombre,
                        Precio = item.Precio,
                        Consumo = PdElectrodomesticos.Consumo,
                        Localizacion = PdElectrodomesticos.Localizacion,
                        Descripcion = PdElectrodomesticos.Descripcion,
                        Marca = PdElectrodomesticos.Marca,
                        Departamento = "Electrodomesticos",
                        FotoUrl = item.Fotos[0].Url,
                        Stocks = item.Stocks.FindAll(x => x.Vendido==false).Count(),
                        CantidadVendidos = item.Stocks.FindAll(x => x.Vendido==true).Count(),
                        CantidadVenta = item.Stocks.FindAll(x => x.EnVenta==true).Count(),
                        Ganancias = item.Ganancias
                    };
                productosEnVenta.Add(productoDto);
            }
                }
            }
            return productosEnVenta;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductoDto>> GetProductoById(string id)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).Include(f => f.Fotos).SingleOrDefaultAsync(x => x.Id == id);
            if (producto.Fotos.Count()==0){
                producto.Fotos.Add(new Foto());
            }
            if (producto.Informaticas.Count()>0){
                var PdInformatica = producto.Informaticas[0];

                var productoDto = new ProductoDto
                    {
                    Id = producto.Id,
                    Nombre = producto.Nombre,
                    Precio = producto.Precio,
                    Tipo = PdInformatica.Tipo,
                    Descripcion = PdInformatica.Descripcion,
                    Marca = PdInformatica.Marca,
                    Departamento = "Informatica",
                    FotoUrl = producto.Fotos[0].Url,
                    Stocks = producto.Stocks.FindAll(x => x.Vendido==false).Count(),
                    CantidadVendidos = producto.Stocks.FindAll(x => x.Vendido==true).Count(),
                    CantidadVenta = producto.Stocks.FindAll(x => x.EnVenta==true).Count(),
                    Ganancias = producto.Ganancias
                    };
                return  productoDto;
            }
            else{
                
                var PdElectrodomesticos = producto.Electrodomesticos[0];

                var productoDto = new ProductoDto
                    {
                        Id = producto.Id,
                        Nombre = producto.Nombre,
                        Precio = producto.Precio,
                        Consumo = PdElectrodomesticos.Consumo,
                        Localizacion = PdElectrodomesticos.Localizacion,
                        Descripcion = PdElectrodomesticos.Descripcion,
                        Marca = PdElectrodomesticos.Marca,
                        Departamento = "Electrodomesticos",
                        FotoUrl = producto.Fotos[0].Url,
                        Stocks = producto.Stocks.FindAll(x => x.Vendido==false).Count(),
                        CantidadVendidos = producto.Stocks.FindAll(x => x.Vendido==true).Count(),
                        CantidadVenta = producto.Stocks.FindAll(x => x.EnVenta==true).Count(),
                        Ganancias = producto.Ganancias
                    };
                return  productoDto;
            }

        }

        [HttpGet("comprobarId")]
        public async Task<List<string>> GetComprobarId()
        {
            var productos = await _context.Productos.ToListAsync();
            List<string> lista= new ();
            foreach (var item in productos)
            {
                lista.Add(item.Id);
            }

            return lista;
        }

        [HttpPost("registro")]
        public async Task<ActionResult<ProductoDto>> Registro(ProductoDto productoDto)
        {
            Guid newGuid = Guid.NewGuid();
            string guidString = newGuid.ToString();

            while (await _context.Productos.FindAsync(await _context.Productos.Include(p => p.Stocks).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).Include(f => f.Fotos).SingleOrDefaultAsync(x => x.Id == guidString))!=null)
            {
                newGuid = Guid.NewGuid();
                guidString = newGuid.ToString();
            }
            productoDto.Id= guidString;
            
            if (productoDto.Departamento == "Infor")
            {
                

                var producto = new Producto
                {
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                    Departamento = "Informatica",
                    Ganancias = 0,
                    Fotos= [],
                    Electrodomesticos = [],
                    Informaticas = [],
                    Stocks = []
                };

                var foto = new Foto
                {
                    
                    Url = "https://res.cloudinary.com/dbqouohtd/image/upload/v1739204851/da-net7/sugqjfadlhkyiuzy6yhg.jpg",
                    publicId = "da-net7/sugqjfadlhkyiuzy6yhg",
                    ProductoId = producto.Id,
                    Producto = producto
                };
                producto.Fotos.Add(foto);

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

                return  productoDto;
            }
            else{

                var producto = new Producto
                {
                    Id = productoDto.Id,
                    Nombre = productoDto.Nombre,
                    Precio = productoDto.Precio,
                     Ganancias = 0,
                    Departamento = "Electrodomestico",
                    Fotos= [],
                    Electrodomesticos = [],
                    Informaticas = [],
                    Stocks = []
                };

                var foto = new Foto
                {
                    
                    Url = "https://res.cloudinary.com/dbqouohtd/image/upload/v1739204851/da-net7/sugqjfadlhkyiuzy6yhg.jpg",
                    publicId = "da-net7/sugqjfadlhkyiuzy6yhg",
                    ProductoId = producto.Id,
                    Producto = producto
                };
                producto.Fotos.Add(foto);

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

                return productoDto;
            }
        }

        [HttpDelete("borrar/{id}")]
        public async Task<ActionResult> DeleteProducto (string id)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);
            
            _context.Productos.Remove(producto);
            
            await _context.SaveChangesAsync();
            
            return Ok();   
            
        }

        [HttpPost("cambios")]
        public async Task<ActionResult> UpdateUser( ProductoDto productoDto)
        {
            var productoActualizar = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == productoDto.Id);

            _context.Productos.Remove(await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == productoDto.Id));

            await _context.SaveChangesAsync();

            productoActualizar.Nombre = productoDto.Nombre;
            productoActualizar.Precio = productoDto.Precio;
            if (productoDto.Departamento == "Electrodomesticos"){
                productoActualizar.Electrodomesticos[0].Descripcion = productoDto.Descripcion;
                productoActualizar.Electrodomesticos[0].Marca = productoDto.Marca;
                productoActualizar.Electrodomesticos[0].Consumo = productoDto.Consumo;
                productoActualizar.Electrodomesticos[0].Localizacion = productoDto.Localizacion;
            }
            else{
                productoActualizar.Informaticas[0].Descripcion = productoDto.Descripcion;
                productoActualizar.Informaticas[0].Marca = productoDto.Marca;
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

             var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

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

            [HttpPost("ventas/{id}/{cantidad}")]
        public async Task<ActionResult<int>> addStock(string id,int cantidad)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            if (producto.Stocks.Count()==0){
                var NuevoStock = new Stock{
                    Precio = producto.Precio,
                    Vendido = false,
                    EnVenta = false,
                    Contador  = producto.Id+"0",
                    ProductoId = producto.Id,
                    Producto = producto
                };
                cantidad-=1;
                producto.Stocks.Add(NuevoStock);
            }

            for(var i=0; i<cantidad; i++){
                var NuevoStock = new Stock{
                    Precio = producto.Precio,
                    Vendido = false,
                    EnVenta = false,
                    Contador  = producto.Id+producto.Stocks.Count(),
                    ProductoId = producto.Id,
                    Producto = producto
                };
                producto.Stocks.Add(NuevoStock);
            }

            await _context.SaveChangesAsync();

            return  producto.Stocks.Count();
        }

        [HttpPut("ventas/{id}/{cantidad}")]
        public async Task<ActionResult<int>> ponerEnVenta(string id,int cantidad)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            var productoNoVenta = producto.Stocks.FindAll(x => x.EnVenta==false && x.Vendido==false );

            for (int i=0; i<cantidad; i++){
                productoNoVenta[i].EnVenta=true;
            }

            await _context.SaveChangesAsync();

            return  producto.Stocks.Count();
        }

        [HttpPut("ventas/quitar/{id}/{cantidad}")]
        public async Task<ActionResult<int>> quitarEnVenta(string id,int cantidad)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            var productoNoVenta = producto.Stocks.FindAll(x => x.EnVenta==true && x.Vendido==false);

            if (cantidad>productoNoVenta.Count()) return BadRequest("Cantidad mayor a la existente");

            for (int i=0; i<cantidad; i++){
                productoNoVenta[i].EnVenta=false;
            }

            await _context.SaveChangesAsync();

            return  producto.Stocks.Count();
        }

        [HttpPut("ventas/comprar/{id}/{cantidad}")]
        public async Task<ActionResult<float>> comprarProducto(string id,int cantidad)
        {
            var producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);

            var productoNoVenta = producto.Stocks.FindAll(x => x.EnVenta==true && x.Vendido==false);

            if (cantidad>productoNoVenta.Count()) return BadRequest("Cantidad mayor a la existente");

            for (int i=0; i<cantidad; i++){
                productoNoVenta[i].EnVenta=false;
                productoNoVenta[i].Vendido=true;
            }

            await _context.SaveChangesAsync();

            producto = await _context.Productos.Include(p => p.Stocks).Include(f => f.Fotos).Include(p => p.Electrodomesticos).Include(a => a.Informaticas).SingleOrDefaultAsync(x => x.Id == id);
            producto.Ganancias += cantidad * producto.Precio;

            await _context.SaveChangesAsync();
            return   producto.Ganancias;
        }

        [HttpPut("carrito")]
        public async Task<ActionResult<List<ProductoDto>>> ObtenerCarrito(List<Compra>compras)
        {
            var productos= new List<ProductoDto>();

            foreach (var item in compras)
            {
                var producto = await GetProductoById(item.Id);

                productos.Add(producto.Value);
            }

            return productos;

            
        }

    } 



}
