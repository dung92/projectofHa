using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.EmployeePosition
{
    [Table("EmployeePosition")]
    public class EmployeePositionEntity : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int BaseSalary { get; set; }
        public int Bonus { get; set; }
    }
}
