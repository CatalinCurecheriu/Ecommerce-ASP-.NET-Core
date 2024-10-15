namespace Ecommerce.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
