using Abp.Domain.Entities;
using GymManage.EmployeePosition;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Employee
{
    [Table("Employee")]
    public class EmployeeEntity :  Entity
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? Born { get; set; }
        public string Adress { get; set; }
        public string PhoneNumber { get; set; }
        public int? Salary { get; set; }
        public DateTime? FromDate { get; set; }
        public bool? Status { get; set; }


        //khoa ngoai den position
        [ForeignKey(nameof(PositionId))]
        public EmployeePositionEntity EmployeePosition { get; set; }
        public int? PositionId { get; set; }
    }
}
