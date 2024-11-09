namespace Ecommerce.Dto
{
    public class CartDto
    {
        public int Id { get; set; }
        public required string CartName { get; set; }

        // Inizializzazione direttamente nel campo
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>(); // Inizializza con una lista vuota
    }
}
