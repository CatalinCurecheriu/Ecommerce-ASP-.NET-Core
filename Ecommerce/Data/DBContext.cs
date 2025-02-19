﻿using Microsoft.EntityFrameworkCore;
using Ecommerce.Models;

namespace Ecommerce.Data
{
    public class ECommerceContext : DbContext
    {
        public ECommerceContext(DbContextOptions<ECommerceContext> options)
            : base(options) { }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurazione della proprietà Price di Product
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2); // Precisione di 18 e scala di 2 decimali per il prezzo

            // Configurazione per la proprietà Stock (nullable)
            modelBuilder.Entity<Product>()
                .Property(p => p.Stock)
                .IsRequired(false); // Stock è nullable (non obbligatorio)

            // Eventuali altre configurazioni, se necessarie
        }
    }
}
