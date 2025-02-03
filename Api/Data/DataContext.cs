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
            .WithOne(c => c.Electrodomesticos)
            .HasForeignKey<Producto>(p => p.Id)
            .IsRequired();

            modelBuilder.Entity<Informatica>()
            .HasOne(p => p.Producto)
            .WithOne(c => c.Informaticas)
            .HasForeignKey<Producto>(p => p.Id)
            .IsRequired();
        }
    }
}