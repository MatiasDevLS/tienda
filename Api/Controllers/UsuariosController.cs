using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTOs;
using Api.Entities;
using API.Controllers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class UsuariosController : BaseApiController
    {
        private readonly UserManager<Usuario> _userManager;
        public UsuariosController(UserManager<Usuario> userManager)
        {
            _userManager = userManager;
        }
        [HttpPost("registroUsuario")]
        public async Task<ActionResult<Usuario>> RegistrarUsuario(UsuarioDto usuarioDto)
        {
            var usuario= new Usuario{
                Nombre = usuarioDto.Nombre,
                Apellidos = usuarioDto.Apellidos,
                UserName = usuarioDto.Username
            };

            var  resultado = await _userManager.CreateAsync(usuario, usuarioDto.Password);

            return usuario;

            
            

        }

        [HttpPost("inicioUsuario")]
        public async Task<ActionResult<Usuario>> InicioUsuario(UsuarioDto usuarioDto)
        {
            var usuario =  _userManager.Users
                .SingleOrDefault(x => x.UserName == usuarioDto.Username);

            var resultado = await _userManager.CheckPasswordAsync(usuario, usuarioDto.Password);

            if (!resultado) return Unauthorized("Usuario invalido");

            return  new Usuario{
                Nombre = usuarioDto.Nombre,
                Apellidos = usuarioDto.Apellidos,
                UserName = usuarioDto.Username
            };

           

            
            

        }
    }
}