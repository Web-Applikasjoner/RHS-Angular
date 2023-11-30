using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
//using RHS_Angular.DAL;
using RHS_Angular.Controllers;
using RHS_Angular.Models;
using RHS_Angular.ViewModels;
using Xunit;

public class IItemControllerTest
{
        [Fact]
    public async Task GetAll_ReturnsOkResult()
        {
            // Arrange
        var itemList = new List<Item>()
        {
            new Item
            {
                ItemId=1,
                Category ="House",
                Location = "Drammen",
                Rooms = 6,
                Area = 150,
                Renting = 19000 ,
                Description = "A new build house",


             },

             new Item
            {
                ItemId = 2,
                Category ="House",
                Location = "Drammen",
                Rooms = 6,
                Area = 160,
                Renting = 17500 ,
                Description = "A new build house",


             }


            };
        var itemRepositoryMock = new Mock<IItemRepository>();
        itemRepositoryMock.Setup(repo => repo.GetAll()).ReturnsAsync(itemList);


        var loggerMock = new Mock<ILogger<ItemController>>();

        var itemController = new ItemController(itemRepositoryMock.Object, loggerMock.Object);



            // Act
        var result = await itemController.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var items = Assert.IsType<List<Item>>(okResult.Value);
        Assert.Equal(itemList.Count, items.Count);   // Compare the number of items
        Assert.Equal(itemList, items);               // Compare the content of the lists

    }
           
    [Fact]

    public async Task TestCreateNotOk()
    {
        // Arrange
        var testItem = new Item
        {
            ItemId = 2,
            Location = "Drammen",
            Rooms = 6,
            Area = 150,
            Renting = 1900,
            Description = "A new build house",
        };

        var mockItemRepository = new Mock<IItemRepository>();
        mockItemRepository.Setup(repo => repo.Create(testItem)).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<ItemController>>();
        var itemController = new ItemController(mockItemRepository.Object, mockLogger.Object);

        // Act
        var result = await itemController.Create(testItem);

            // Assert

        var viewResult = Assert.IsType<BadRequestObjectResult>(result);
        var viewItem = Assert.IsAssignableFrom<Item>(viewResult);
       Assert.Equal(testItem, viewItem);


}






}