using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.Timetable.Request
{
    public class TimeTableViewModel
    {
        public int Id { get; set; }
        public int ClassId { get; set; }     
        public int SessionId { get; set; }
        public int EmployeeId { get; set; }
        public string Day { get; set; }
        public string Lesson { get; set; }
        public DateTime Date { get; set; }
        public string ClassName { get; set; }
        public string SessionName { get; set; }
        public string EmployeeName { get; set; }
        public string CurentUserName { get; set; }
        public string EmployeeUserName { get; set; }
    }
}
