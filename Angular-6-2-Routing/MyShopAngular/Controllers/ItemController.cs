using Microsoft.AspNetCore.Mvc;
using MyShopAngular.Models;

namespace MyShopAngular.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : Controller
{
    private static List<Item> Items = new List<Item>()
        {
            new Item
            {
                ItemId = 1,
                Name = "Pizza",
                Price = 150,
                Description = "Delicious Italian dish with a thin crust topped with tomato sauce, cheese, and various toppings.",
                ImageUrl = "assets/images/pizza.jpg"
            },
            new Item
            {
                ItemId = 2,
                Name = "Fried Chicken Leg",
                Price = 20,
                Description = "Crispy and succulent chicken leg that is deep-fried to perfection, often served as a popular fast food item.",
                ImageUrl = "assets/images/chickenleg.jpg"
            },
            new Item
            {
                ItemId = 3,
                Name = "French Fries",
                Price = 50,
                Description = "Crispy, golden-brown potato slices seasoned with salt and often served as a popular side dish or snack.",
                ImageUrl = "assets/images/frenchfries.jpg"
            },
            new Item
            {
                ItemId = 4,
                Name = "Grilled Ribs",
                Price = 250,
                Description = "Tender and flavorful ribs grilled to perfection, usually served with barbecue sauce.",
                ImageUrl = "assets/images/ribs.jpg"
            },
            new Item
            {
                ItemId = 5,
                Name = "Tacos",
                Price = 150,
                Description = "Tortillas filled with various ingredients such as seasoned meat, vegetables, and salsa, folded into a delicious handheld meal.",
                ImageUrl = "assets/images/tacos.jpg"
            },
            new Item
            {
                ItemId = 6,
                Name = "Fish and Chips",
                Price = 180,
                Description = "Classic British dish featuring battered and deep-fried fish served with thick-cut fried potatoes.",
                ImageUrl = "assets/images/fishandchips.jpg"
            },
            new Item
            {
                ItemId = 7,
                Name = "Cider",
                Price = 50,
                Description = "Refreshing alcoholic beverage made from fermented apple juice, available in various flavors.",
                ImageUrl = "assets/images/cider.jpg"
            },
            new Item
            {
                ItemId = 8,
                Name = "Coke",
                Price = 30,
                Description = "Popular carbonated soft drink known for its sweet and refreshing taste.",
                ImageUrl = "assets/images/coke.jpg"
            }
        };

    [HttpGet]
    public List<Item> GetAll()
    {
        return Items;
    }
}

