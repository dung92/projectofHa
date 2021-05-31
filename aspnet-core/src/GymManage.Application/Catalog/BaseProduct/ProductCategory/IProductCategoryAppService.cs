using GymManage.Catalog.ProductCategory.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductCategory
{
    public interface IProductCategoryAppService
    {
        Task<List<ProductCategoryViewModel>> GetAllProductCategory(GetProductCategoryRequest request);

        Task<List<ProductCategoryViewModel>> GetProductCategoryById(GetProductCategoryById request);

        Task CreateOrUpdateProductCategory(CreateOrUpdateProductCategoryRequest request);

        Task DeleteProductCategory(int id);
    }
}
