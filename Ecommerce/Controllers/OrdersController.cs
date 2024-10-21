using System.Collections.Generic;
using System.Threading.Tasks;
using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null) return NotFound();

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> AddOrder(Order order)
        {
            var newOrder = await _orderRepository.AddOrderAsync(order);
            return CreatedAtAction(nameof(GetOrderById), new { id = newOrder.Id }, newOrder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            if (id != order.Id) return BadRequest();

            var result = await _orderRepository.UpdateOrderAsync(order);
            if (!result) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var result = await _orderRepository.DeleteOrderAsync(id);
            if (!result) return NotFound();

            return NoContent();
        }
    }
}
