using System.Collections.Generic;
using System.Threading.Tasks;
using Ecommerce.Data;
using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ECommerceContext _context;

        public OrderRepository(ECommerceContext context)
        {
            _context = context;
        }

        // Ottieni tutti gli ordini
        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        // Ottieni un ordine per ID, includendo il cliente associato
        public async Task<Order?> GetOrderByIdAsync(int id) // Risultato nullable
        {
            return await _context.Orders
                .Include(o => o.Customer) // Include il customer associato all'ordine
                .FirstOrDefaultAsync(o => o.Id == id); // Cerca l'ordine con l'ID specificato
        }

        // Aggiungi un nuovo ordine
        public async Task<Order> AddOrderAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        // Aggiorna un ordine esistente
        public async Task<bool> UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            return await _context.SaveChangesAsync() > 0;
        }

        // Elimina un ordine
        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null) return false;

            _context.Orders.Remove(order);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
