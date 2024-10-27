using Microsoft.EntityFrameworkCore;
using Ecommerce.Data;  // Assicurati che questo sia incluso
using Ecommerce.Models;
using Microsoft.Extensions.DependencyInjection;
using Ecommerce.Interfaces; // Assicurati di includere le interfacce
using Ecommerce.Repository; // Assicurati di includere le implementazioni dei repository
using AutoMapper; // Includi il namespace per AutoMapper
using Ecommerce.Dto; // Includi il namespace per i DTO

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the database context
builder.Services.AddDbContext<ECommerceContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add repository services
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Add AutoMapper
builder.Services.AddAutoMapper(typeof(Program)); // Registrazione di AutoMapper

var app = builder.Build();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services); // Initialize the seed data
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
