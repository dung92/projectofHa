using GymManage.Catalog.ClassManage.TrainingClass.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClass
{
    public interface ITrainingClassAppService
    {
        Task<List<TrainingClassViewModel>> GetAllTrainingClass(GetTrainingClassRequest request);

        Task DeleteTrainingClass(int id);

        Task CreateOrUpdateTrainingClass(CreateOrUpdateTrainingClassRequest request);

        Task<List<TrainingClassViewModel>> GetTrainingClassById(GetTrainingClassByIdRequest request);
    }
}
