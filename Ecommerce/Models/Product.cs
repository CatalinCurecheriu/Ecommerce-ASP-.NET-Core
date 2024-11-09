namespace Ecommerce.Models
{
    public class Product
    {
        public int Id { get; set; } // Questa proprietà non deve essere presente nel corpo della richiesta POST
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int? Stock { get; set; } // Modificato per essere nullable
        public List<OrderItem> OrderItems { get; set; } = new(); // Inizializzato
    }
}
