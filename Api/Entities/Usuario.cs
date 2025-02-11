using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class Usuario : IdentityUser<int>
    {
        
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}