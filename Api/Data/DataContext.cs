using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class DataContext : IdentityDbContext<Usuario, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Producto> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
            .HasMany(p => p.UserRoles)
            .WithOne(c => c.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

            modelBuilder.Entity<AppRole>()
            .HasMany(p => p.UserRoles)
            .WithOne(c => c.Role)
            .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<Electrodomestico>()
            .HasOne(p => p.Producto)
            .WithMany(c => c.Electrodomesticos)
            .HasForeignKey(p => p.ProductoId);

            modelBuilder.Entity<Informatica>()
            .HasOne(p => p.Producto)
            .WithMany(c => c.Informaticas)
            .HasForeignKey(p => p.ProductoId);

            modelBuilder.Entity<Foto>()
            .HasOne(p => p.Producto)
            .WithMany(c => c.Fotos)
            .HasForeignKey(p => p.ProductoId);

             modelBuilder.Entity<Stock>()
            .HasOne(p => p.Producto)
            .WithMany(c => c.Stocks)
            .HasForeignKey(p => p.ProductoId);
        }
    }
}