using System.Collections.Generic;

namespace Ecommerce.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; } // Modificato
        public required string Description { get; set; } // Modificato
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new(); // Inizializzato
    }
}
