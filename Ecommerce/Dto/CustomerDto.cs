namespace Ecommerce.Dto
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        // Non includere la password nel DTO per motivi di sicurezza
    }
}
