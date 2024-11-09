using AutoMapper;
using Ecommerce.Dto;
using Ecommerce.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Configura il mapping di Order a OrderDto con i dettagli del cliente
        CreateMap<Order, OrderDto>()
            .ForMember(dest => dest.CustomerName, opt => opt.MapFrom(src => src.Customer.Name))
            .ForMember(dest => dest.CustomerEmail, opt => opt.MapFrom(src => src.Customer.Email))
            .ForMember(dest => dest.CustomerPassword, opt => opt.MapFrom(src => src.Customer.Password))
            .ReverseMap();

        CreateMap<Product, ProductDto>().ReverseMap();
        CreateMap<Cart, CartDto>().ReverseMap();
        CreateMap<CartItem, CartItemDto>().ReverseMap();
        CreateMap<Customer, CustomerDto>().ReverseMap();
        CreateMap<OrderItem, OrderItemDto>().ReverseMap();
    }
}
