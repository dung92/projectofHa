using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClass.Request
{
    public class GetTrainingClassByIdRequest
    {
        public int? productId { get; set; }
        public int? trainingClassCategoryId { get; set; }
    }
}
