using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Producto> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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