namespace Ecommerce.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public required Order Order { get; set; } // Modificato
        public required Product Product { get; set; } // Modificato
        public int Quantity { get; set; }
    }
}
