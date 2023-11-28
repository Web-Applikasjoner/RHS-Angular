using Microsoft.Extensions.Logging;
using Moq;
using RHS_Angular.Controllers;
using RHS_Angular.Models;
using Microsoft.AspNetCore.Mvc;
using RHS_Angular.ViewModels;


namespace Xunittest_HRS.Controllers
{
    public class ItemControllerTests
    {
        [Fact]
        public async Task TestGetItemById()
        {
            // Arrange
            var itemId = 1;
            var mockItemRepository = new Mock<IItemRepository>();
            var mockLogger = new Mock<ILogger<ItemController>>();

            var itemController = new ItemController(mockItemRepository.Object, mockLogger.Object);

            var mockItem = new Item
            {
                ItemId = itemId,
                Category = "Fried Chicken Wing",
                Renting = 20,
                Description = "Delicious spicy chicken wing",
                ImageUrl = "/images/chickenwing.jpg"
            };

            mockItemRepository.Setup(repo => repo.GetItemById(itemId)).ReturnsAsync(mockItem);

            // Act
           
            var result = await itemController.Create(mockItem);

            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var returnedItem = Assert.IsAssignableFrom<Item>(viewResult.Value);
            Assert.Equal(itemId, returnedItem.ItemId);
        }
    }
}
