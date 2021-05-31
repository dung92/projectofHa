using GymManage.Catalog.Product.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GymManage.Catalog.Product
{
    public interface IServiceAppService
    {
        Task<List<ProductViewModel>> GetAllProduct(GetProductRequest request);

        Task CreateOrUpdateProduct(CreateOrUpdateProductRequest request);

        Task DeleteProduct(int id);
    }
}
