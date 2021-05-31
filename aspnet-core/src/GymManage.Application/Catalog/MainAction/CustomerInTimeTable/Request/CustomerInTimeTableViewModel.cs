using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.CustomerInTimeTable.Request
{
    public class CustomerInTimeTableViewModel
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int TimeTableId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string ClassName { get; set; }
        public string EmployeeName { get; set; }
        public string Lesson { get; set; }
        public DateTime Date { get; set; }
        public int SessionId { get; set; }
        public string SessionName { get; set; }
        public bool Active { get; set; }
    }
}
