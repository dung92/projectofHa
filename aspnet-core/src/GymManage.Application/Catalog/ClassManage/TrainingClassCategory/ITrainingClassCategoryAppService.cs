using GymManage.Catalog.ClassManage.TrainingClassCategory.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClassCategory
{
    public interface ITrainingClassCategoryAppService
    {
        Task<List<TrainingClassCategoryViewModel>> GetAllTrainingClassCategory(GetTrainingClassCategoryRequest request);

        Task DeleteTrainingClassCategory(int id);

        Task CreateOrUpdateTrainingClassCategory(CreateOrUpdateTrainingClassCategoryRequest request);
    }
}
