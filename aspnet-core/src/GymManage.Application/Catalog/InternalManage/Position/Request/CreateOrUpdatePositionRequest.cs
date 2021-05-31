using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Position.Request
{
    public class CreateOrUpdatePositionRequest
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int BaseSalary { get; set; }
        public int Bonus { get; set; }
    }
}
