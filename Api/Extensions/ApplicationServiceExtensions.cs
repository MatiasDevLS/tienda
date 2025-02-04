using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration confing)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(confing.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();

            return services;
        }
    }
}