using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class Seed
    {
        public static async Task Roles(UserManager<Usuario> usuarioManager,RoleManager<AppRole> roleManager)
        {
            if (await usuarioManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Admin"},
                new AppRole{Name = "AdminMedio"},
                new AppRole{Name = "AdminBajo"},
                new AppRole{Name = "Miembro"},
            };

            foreach (var rol in roles)
            {
                await roleManager.CreateAsync(rol);
            }

            var admin = new Usuario
            {
                UserName = "admin",
                Nombre = "Nombre_admin",
                Apellidos = "Apellido1_admin Apellido2_admin"
            };
            await usuarioManager.CreateAsync(admin, "11111hJ");
            await usuarioManager.AddToRolesAsync(admin, new[] {"Admin", "AdminMedio","AdminBajo"});
        }
    }
}