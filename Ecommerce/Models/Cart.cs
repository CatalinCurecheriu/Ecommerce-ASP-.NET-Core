using System.Collections.Generic;

namespace Ecommerce.Models
{
    public class Cart
    {
        public Cart() // Costruttore senza parametri
        {
            CartItems = new List<CartItem>();
        }

        public int Id { get; set; }
        public required Customer Customer { get; set; } // Utilizza 'required'
        public List<CartItem> CartItems { get; set; }
    }

}