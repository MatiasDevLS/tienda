using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        private readonly UserManager<Usuario> _userManager;
        public TokenService(IConfiguration config, UserManager<Usuario> userManager)
        {
            _userManager = userManager;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        public async Task<string> CrearToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, usuario.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, usuario.UserName)
            };

            var roles = await _userManager.GetRolesAsync(usuario);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds= new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}