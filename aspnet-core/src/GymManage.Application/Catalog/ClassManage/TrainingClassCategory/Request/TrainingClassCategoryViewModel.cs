using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClassCategory.Request
{
    public class TrainingClassCategoryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
    }
}
