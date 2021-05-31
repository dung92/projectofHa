using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.CustomerInTimeTable.Request
{
    public class CreateOrUpdateCustomerInTimeTableRequest
    {
        public int? Id { get; set; }
        public int CustomerId { get; set; }
        public int TimeTableId { get; set; }
        public bool Active { get; set; }
    }
}
