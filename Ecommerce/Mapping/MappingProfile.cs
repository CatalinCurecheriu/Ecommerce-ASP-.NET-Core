
// Mapping/MappingProfile.cs
using AutoMapper;
using Ecommerce.Models;  // Assicurati di includere il namespace corretto
using Ecommerce.Dto;     // Assicurati di includere il namespace corretto

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Order, OrderDto>().ReverseMap(); // Aggiunta mappatura inversa
        CreateMap<Product, ProductDto>().ReverseMap(); // Aggiunta mappatura inversa
        CreateMap<Cart, CartDto>().ReverseMap(); // Aggiunta mappatura per il carrello
        CreateMap<CartItem, CartItemDto>().ReverseMap(); // Aggiunta mappatura per l'elemento del carrello
        CreateMap<Customer, CustomerDto>().ReverseMap(); // Aggiunta mappatura per il cliente
        CreateMap<OrderItem, OrderItemDto>().ReverseMap(); // Aggiunta mappatura per l'elemento dell'ordine
    }
}
