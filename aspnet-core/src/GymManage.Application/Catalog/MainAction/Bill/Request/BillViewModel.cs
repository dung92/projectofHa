using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.Bill.Request
{
    public class BillViewModel
    {
        public int? Id { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserCreated { get; set; }
        public float OriginalPrice { get; set; }
        public float Discount { get; set; }
        public float TotalPrice { get; set; }
        public string Note { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
    }
}
