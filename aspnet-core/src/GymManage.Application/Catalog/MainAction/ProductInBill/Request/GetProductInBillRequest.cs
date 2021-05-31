using Abp.AutoMapper;
using GymManage.ProductInBill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductInBill.Request
{
    [AutoMapFrom(typeof(ProductInBillEntity))]
    public class GetProductInBillRequest
    {
        public string Keyword { get; set; }
    }
}
