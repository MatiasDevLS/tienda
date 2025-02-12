using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTOs;
using Api.Entities;
using Api.Interfaces;
using API.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class UsuariosController : BaseApiController
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly ITokenService _tokenService;
        public UsuariosController(UserManager<Usuario> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost("registroUsuario")]
        public async Task<ActionResult<UsuarioDto>> RegistrarUsuario(UsuarioDto usuarioDto)
        {
            var usuario= new Usuario{
                Nombre = usuarioDto.Nombre,
                Apellidos = usuarioDto.Apellidos,
                UserName = usuarioDto.Username
            };

            var  resultado = await _userManager.CreateAsync(usuario, usuarioDto.Password);

            var rolResultado = await _userManager.AddToRoleAsync(usuario,"Miembro");

            return new UsuarioDto{
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                Username = usuario.UserName,
                Token = await _tokenService.CrearToken(usuario),
                Rol = await _userManager.GetRolesAsync(usuario)
            };

            
            

        }

        [HttpPost("inicioUsuario")]
        public async Task<ActionResult<UsuarioDto>> InicioUsuario(UsuarioDto usuarioDto)
        {
            var usuario =  _userManager.Users
                .SingleOrDefault(x => x.UserName == usuarioDto.Username);

            var resultado = await _userManager.CheckPasswordAsync(usuario, usuarioDto.Password);

            if (!resultado) return Unauthorized("Usuario invalido");

            return  new UsuarioDto{
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                Username = usuarioDto.Username,
                Token = await _tokenService.CrearToken(usuario),
                Rol = await _userManager.GetRolesAsync(usuario)
            };

           

            
            

        }
    }
}