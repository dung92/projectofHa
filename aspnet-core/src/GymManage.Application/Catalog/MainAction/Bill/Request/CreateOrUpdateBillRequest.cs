using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.Bill.Request
{
    public class CreateOrUpdateBillRequest 
    {
        public int? Id { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public float OriginalPrice { get; set; }
        public float Discount { get; set; }
        public float TotalPrice { get; set; }
        public string Note { get; set; }
    }
}
