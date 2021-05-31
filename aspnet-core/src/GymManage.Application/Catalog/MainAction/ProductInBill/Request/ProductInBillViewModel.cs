using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductInBill.Request
{
    public class ProductInBillViewModel 
    {
        public int Id { get; set; }
        public int ProductCategoryId { get; set; }
        public int BillId { get; set; }
        public int CustomerId { get; set; }
        public string  CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string BillName { get; set; }
        public DateTime DateCreated { get; set; }
        public float OriginalPrice { get; set; }
        public float Discount { get; set; }
        public float TotalPrice { get; set; }
        public string UserCreated { get; set; }
        public string Note { get; set; }
        public string ProductName { get; set; }
        public string OptionName { get; set; }
        public string ServiceName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
