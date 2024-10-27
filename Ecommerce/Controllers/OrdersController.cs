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
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper; // Aggiungi un campo per IMapper

        public OrdersController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper; // Inizializza IMapper
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders); // Mappa a OrderDto
            return Ok(orderDtos);
        }

        // GET: api/orders/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrderById(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null) return NotFound(); // Restituisce 404 se l'ordine non esiste

            var orderDto = _mapper.Map<OrderDto>(order); // Mappa a OrderDto
            return Ok(orderDto);
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<OrderDto>> AddOrder([FromBody] OrderDto orderDto)
        {
            if (orderDto == null) return BadRequest("OrderDto cannot be null."); // Verifica se l'oggetto è null

            var order = _mapper.Map<Order>(orderDto); // Mappa da OrderDto a Order
            var newOrder = await _orderRepository.AddOrderAsync(order);
            var newOrderDto = _mapper.Map<OrderDto>(newOrder); // Mappa a OrderDto

            return CreatedAtAction(nameof(GetOrderById), new { id = newOrderDto.Id }, newOrderDto); // Restituisce 201
        }

        // PUT: api/orders/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderDto orderDto)
        {
            if (id != orderDto.Id) return BadRequest("ID mismatch."); // Controlla che gli ID corrispondano
            if (orderDto == null) return BadRequest("OrderDto cannot be null."); // Verifica se l'oggetto è null

            var order = _mapper.Map<Order>(orderDto); // Mappa da OrderDto a Order
            var result = await _orderRepository.UpdateOrderAsync(order);
            if (!result) return NotFound(); // Restituisce 404 se l'ordine non esiste

            return NoContent(); // Restituisce 204 se l'aggiornamento ha successo
        }

        // DELETE: api/orders/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderRepository.DeleteOrderAsync(id);
            if (!result) return NotFound(); // Restituisce 404 se l'ordine non esiste

            return NoContent(); // Restituisce 204 se la cancellazione ha successo
        }
    }
}
