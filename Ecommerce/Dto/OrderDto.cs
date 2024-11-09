namespace Ecommerce.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public required string CustomerName { get; set; }
        public required string CustomerEmail { get; set; } // Nuovo campo
        public required string CustomerPassword { get; set; } // Nuovo campo
        public DateTime OrderDate { get; set; }
        // Aggiungi altre proprietà se necessario
    }
}
