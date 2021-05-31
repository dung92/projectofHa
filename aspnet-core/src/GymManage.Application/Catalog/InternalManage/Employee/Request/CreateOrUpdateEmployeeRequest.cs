using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Employee.Request
{
    public class CreateOrUpdateEmployeeRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? Born { get; set; }
        public string Adress { get; set; }
        public string PhoneNumber { get; set; }
        public int? Salary { get; set; }
        public DateTime? FromDate { get; set; }
        public bool? Status { get; set; }
        public int? PositionId { get; set; }
    }
}
