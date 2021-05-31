using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.Timetable.Request
{
    public class CreateOrUpdateTimeTableRequest
    {
        public int? Id { get; set; }
        public int ClassId { get; set; }
        public int SessionId { get; set; }
        public int employeeId { get; set; }
        public string Lesson { get; set; }
        public string Day { get; set; }
        public DateTime Date { get; set; }
    }
}
