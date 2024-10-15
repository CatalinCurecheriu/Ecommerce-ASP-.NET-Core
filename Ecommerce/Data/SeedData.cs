using Ecommerce.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Ecommerce.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ECommerceContext(
                serviceProvider.GetRequiredService<DbContextOptions<ECommerceContext>>());

            // Check if the database has been seeded
            if (context.Products.Any() || context.Customers.Any())
            {
                return;   // DB has been seeded
            }

            // Adding customers
            var customers = new List<Customer>
            {
                new Customer { Name = "Peter Jackson", Email = "peter.jackson@example.com", Password = "password123" },
                new Customer { Name = "Steven Spielberg", Email = "steven.spielberg@example.com", Password = "password123" },
                new Customer { Name = "James Cameron", Email = "james.cameron@example.com", Password = "password123" },
                new Customer { Name = "Ridley Scott", Email = "ridley.scott@example.com", Password = "password123" },
                new Customer { Name = "George Lucas", Email = "george.lucas@example.com", Password = "password123" },
                new Customer { Name = "J.J. Abrams", Email = "jj.abrams@example.com", Password = "password123" },
                new Customer { Name = "Christopher Nolan", Email = "christopher.nolan@example.com", Password = "password123" },
                new Customer { Name = "Denis Villeneuve", Email = "denis.villeneuve@example.com", Password = "password123" },
                new Customer { Name = "David Lynch", Email = "david.lynch@example.com", Password = "password123" },
                new Customer { Name = "M. Night Shyamalan", Email = "m.night.shyamalan@example.com", Password = "password123" }
            };

            context.Customers.AddRange(customers);
            context.SaveChanges();

            // Adding products
            var products = new List<Product>
            {
                new Product { Name = "The Lord of the Rings: The Fellowship of the Ring", Description = "An epic fantasy film based on the novel by J.R.R. Tolkien.", Price = 19.99M },
                new Product { Name = "The Lord of the Rings: The Two Towers", Description = "The second part of the epic fantasy trilogy directed by Peter Jackson.", Price = 19.99M },
                new Product { Name = "The Lord of the Rings: The Return of the King", Description = "The final installment in the epic fantasy trilogy directed by Peter Jackson.", Price = 19.99M },
                new Product { Name = "Inception", Description = "A science fiction film directed by Christopher Nolan about dreams and reality.", Price = 14.99M },
                new Product { Name = "Interstellar", Description = "A sci-fi epic directed by Christopher Nolan that explores space travel and time.", Price = 14.99M },
                new Product { Name = "Blade Runner 2049", Description = "A sequel to the original Blade Runner, directed by Denis Villeneuve.", Price = 14.99M },
                new Product { Name = "Avatar", Description = "A sci-fi epic directed by James Cameron that explores the world of Pandora.", Price = 14.99M },
                new Product { Name = "Star Wars: A New Hope", Description = "The original Star Wars film, directed by George Lucas.", Price = 14.99M },
                new Product { Name = "E.T. the Extra-Terrestrial", Description = "A beloved sci-fi film directed by Steven Spielberg about friendship.", Price = 14.99M },
                new Product { Name = "Arrival", Description = "A thought-provoking sci-fi film directed by Denis Villeneuve about language and communication.", Price = 14.99M }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
