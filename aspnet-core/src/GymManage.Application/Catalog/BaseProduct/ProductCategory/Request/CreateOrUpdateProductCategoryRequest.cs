using Abp.AutoMapper;
using GymManage.ProductCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductCategory.Request
{
    [AutoMapTo(typeof(ProductCategoryEntity))]
    public class CreateOrUpdateProductCategoryRequest
    {
        public int? Id { get; set; }
        public int ProductId { get; set; }
        public int OptionId { get; set; }
        public int ServiceId { get; set; }
        public int Price { get; set; }
    }
}
