using System;
using System.Collections.Generic;

namespace Ecommerce.Models
{
    public class Order
    {
        public int Id { get; set; }
        public required Customer Customer { get; set; } // Modificato
        public DateTime OrderDate { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new(); // Inizializzato
    }
}
