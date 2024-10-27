namespace Ecommerce.Dto
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public required ProductDto Product { get; set; }
        public int Quantity { get; set; }
    }
}
