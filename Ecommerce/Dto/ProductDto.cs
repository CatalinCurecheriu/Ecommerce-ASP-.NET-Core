namespace Ecommerce.Dto
{
    public class ProductDto
    {
        public required string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int? Stock { get; set; } // Aggiungi Stock come nullable
        public int? Id { get; set; }  // ID incluso solo per PUT
    }
}
