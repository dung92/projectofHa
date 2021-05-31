using Abp.Domain.Entities;
using GymManage.AppEntity.SessionWork;
using GymManage.Employee;
using GymManage.TrainingClass;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.TimeTable
{
    [Table("TimeTable")]
    public class TimeTableEntity : Entity
    {
        [ForeignKey(nameof(ClassId))]
        public TrainingClassEntity Class { get; set; }
        public int ClassId { get; set; }


        [ForeignKey(nameof(SessionId))]
        public SessionWorkEntity Session { get; set; }
        public int SessionId { get; set; }

        
        [ForeignKey(nameof(employeeId))]
        public EmployeeEntity Employee { get; set; }
        public int employeeId { get; set; }

        public string Lesson { get; set; }
        public string Day { get; set; }
        public DateTime Date { get; set; }
    }
}
