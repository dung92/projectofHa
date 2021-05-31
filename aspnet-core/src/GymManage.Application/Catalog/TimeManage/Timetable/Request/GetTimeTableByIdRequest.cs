using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.Timetable.Request
{
    public class GetTimeTableByIdRequest
    {
        public int? ClassId { get; set; }
        public int? EmployeeId { get; set; }
        public int? SessionId { get; set; }
    }
}
