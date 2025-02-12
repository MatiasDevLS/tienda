using System.Text.Json;
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

            var userData = await File.ReadAllTextAsync("Data/generated.json");

            var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

            var usuarios = JsonSerializer.Deserialize<List<Usuario>>(userData);


            var roles = new List<AppRole>
            {
                new AppRole{Name = "Admin"},
                new AppRole{Name = "AdminMedio"},
                new AppRole{Name = "AdminBajo"},
                new AppRole{Name = "Miembro"}
            };

            foreach (var rol in roles)
            {
                await roleManager.CreateAsync(rol);
            }

                foreach (var usuario in usuarios)
            {
                usuario.UserName = usuario.UserName.ToLower();

                await usuarioManager.CreateAsync(usuario, "11111hJ");

                await usuarioManager.AddToRoleAsync(usuario, usuario.RolCreado.ToLower());
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