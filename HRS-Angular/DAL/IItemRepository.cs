using HRS_Angular.Models;

namespace HRS_Angular.DAL
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetAll();
        Task<Item?> GetItemById(int id);
        Task<bool> Create(Item item);
        Task<bool> Update(Item item);
        Task<bool> Delete(int id);
    }
}
