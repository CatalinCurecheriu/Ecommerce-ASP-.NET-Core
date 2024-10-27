namespace Ecommerce.Dto
{
  
   public class CartItemDto
    {
        public int Id { get; set; }
        public required ProductDto Product { get; set; }
        public int Quantity { get; set; }
    }
}
