namespace Ecommerce.Dto
{
    public class CartDto
    {
        public int Id { get; set; }
        public required CustomerDto Customer { get; set; }
        public List<CartItemDto> CartItems { get; set; }
    }
}