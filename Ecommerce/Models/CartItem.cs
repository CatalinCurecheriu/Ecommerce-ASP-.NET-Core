namespace Ecommerce.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public required Cart Cart { get; set; } // Modificato
        public required Product Product { get; set; } // Modificato
        public int Quantity { get; set; }
    }
}
