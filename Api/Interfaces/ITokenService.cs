using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
    public interface ITokenService
    {
       Task<string> CrearToken(Usuario usuario); 
    }
}