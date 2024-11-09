using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper; // Includi AutoMapper
using Ecommerce.Dto; // Includi il namespace per i DTO
using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.AspNetCore.Http; // Includi Http
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper; // Aggiungi un campo per IMapper

        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper; // Inizializza IMapper
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products); // Mappa a ProductDto
            return Ok(productDtos);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null) return NotFound(); // Restituisce 404 se il prodotto non esiste

            var productDto = _mapper.Map<ProductDto>(product); // Mappa a ProductDto
            return Ok(productDto);
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<ProductDto>> AddProduct([FromBody] ProductDto productDto)
        {
            if (productDto == null) return BadRequest("ProductDto cannot be null."); // Verifica se l'oggetto è null

            // Mappa da ProductDto a Product
            var product = _mapper.Map<Product>(productDto);

            // Aggiungi il prodotto al database (l'ID verrà generato automaticamente dal database)
            var newProduct = await _productRepository.AddProductAsync(product);

            // Mappa il prodotto appena creato a ProductDto (con l'ID generato)
            var newProductDto = _mapper.Map<ProductDto>(newProduct);

            // Restituisci una risposta 201 con l'oggetto appena creato, includendo l'ID generato
            return CreatedAtAction(nameof(GetProductById), new { id = newProduct.Id }, newProductDto); // Usa newProduct.Id
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto productDto)
        {
            if (productDto == null) return BadRequest("ProductDto cannot be null."); // Verifica se l'oggetto è null
            if (id != productDto.Id) return BadRequest("ID mismatch."); // Controlla che gli ID corrispondano

            // Mappa da ProductDto a Product
            var product = _mapper.Map<Product>(productDto);
            var result = await _productRepository.UpdateProductAsync(product);
            if (!result) return NotFound(); // Restituisce 404 se il prodotto non esiste

            return NoContent(); // Restituisce 204 se l'aggiornamento ha successo
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _productRepository.DeleteProductAsync(id);
            if (!result) return NotFound(); // Restituisce 404 se il prodotto non esiste

            return NoContent(); // Restituisce 204 se la cancellazione ha successo
        }
    }
}
