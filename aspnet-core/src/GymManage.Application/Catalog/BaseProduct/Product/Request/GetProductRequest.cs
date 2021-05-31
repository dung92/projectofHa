using Abp.AutoMapper;
using GymManage.Product;

namespace GymManage.Catalog.Product.Request
{
    [AutoMapFrom(typeof(ProductEntity))]
    public class GetProductRequest 
    {
        public string KeyWord { get; set; }
    }
}
