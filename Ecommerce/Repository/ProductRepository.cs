using System.Collections.Generic;
using System.Threading.Tasks;
using Ecommerce.Data;
using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ECommerceContext _context;

        public ProductRepository(ECommerceContext context)
        {
            _context = context;
        }

        // Ottieni tutti i prodotti
        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        // Ottieni un prodotto per ID
        public async Task<Product?> GetProductByIdAsync(int id)  // Modificato per restituire Product? (nullable)
        {
            return await _context.Products.FindAsync(id); // Il risultato può essere null
        }

        // Aggiungi un nuovo prodotto
        public async Task<Product> AddProductAsync(Product product)
        {
            // Aggiungi il prodotto al contesto e salva le modifiche
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Dopo aver salvato, l'ID sarà generato dal database
            return product; // Restituisci il prodotto con l'ID generato
        }

        // Aggiorna un prodotto esistente
        public async Task<bool> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            return await _context.SaveChangesAsync() > 0;
        }

        // Elimina un prodotto
        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
