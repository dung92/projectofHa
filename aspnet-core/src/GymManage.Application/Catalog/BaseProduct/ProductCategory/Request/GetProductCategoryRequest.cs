using Abp.AutoMapper;
using GymManage.ProductCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductCategory.Request
{
    [AutoMapFrom(typeof(ProductCategoryEntity))]
    public class GetProductCategoryRequest
    {
        public string Keyword { get; set; }
    }
}
