using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductCategory.Request
{
    public class ProductCategoryViewModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OptionId { get; set; }
        public int ServiceId { get; set; }
        public string ProductName { get; set; }
        public string OptionName { get; set; }
        public int Amount { get; set; }
        public string Unit { get; set; }
        public string ServiceName { get; set; }
        public int Price { get; set; }

    }
}
