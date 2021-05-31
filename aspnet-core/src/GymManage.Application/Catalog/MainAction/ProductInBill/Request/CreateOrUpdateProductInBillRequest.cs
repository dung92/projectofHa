using Abp.AutoMapper;
using GymManage.ProductInBill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductInBill.Request
{
    [AutoMapTo(typeof(ProductInBillEntity))]
    public class CreateOrUpdateProductInBillRequest
    {
        public int? Id { get; set; }
        public int ProductCategoryId { get; set; }
        public int BillId { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
