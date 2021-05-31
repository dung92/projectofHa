using Abp.AutoMapper;
using GymManage.Product;

namespace GymManage.Catalog.Product.Request
{
    [AutoMapTo(typeof(ProductEntity))]
    public class CreateOrUpdateProductRequest : ProductViewModel
    {
        
    }
}
