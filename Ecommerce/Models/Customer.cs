using System.Collections.Generic;

namespace Ecommerce.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        // Relazione con il carrello
        public List<Cart> Carts { get; set; } = new List<Cart>();
    }
}
