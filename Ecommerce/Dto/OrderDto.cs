namespace Ecommerce.Dto
{
  
        public class OrderDto
        {
            public int Id { get; set; }
            public required string CustomerName { get; set; }
            public DateTime OrderDate { get; set; }
            // Aggiungi altre proprietà se necessario
        }
    
}
