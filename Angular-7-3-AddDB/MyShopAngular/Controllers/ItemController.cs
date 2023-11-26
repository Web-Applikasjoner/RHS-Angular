using Microsoft.AspNetCore.Mvc;
using MyShopAngular.Models;
using MyShopAngular.DAL;

namespace MyShopAngular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<ItemController> _logger;

    public ItemController(IItemRepository itemRepository, ILogger<ItemController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        return Ok(items);
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Item newItem)
    {
        if (newItem == null)
        {
            return BadRequest("Invalid item data.");
        }
        //newItem.ItemId = GetNextItemId();
        bool returnOk = await _itemRepository.Create(newItem);

        if (returnOk)
        {
            var response = new { success = true, message = "Item " + newItem.Name + " created successfully" };
            return Ok(response);
        }
        else
        {
            var response = new { success = false, message = "Item creation failed" };
            return Ok(response);
        }
        
    }

    //private static int GetNextItemId()
    //{
    //    if (Items.Count == 0)
    //    {
    //        return 1;
    //    }
    //    return Items.Max(item => item.ItemId) + 1;
    //}
}

