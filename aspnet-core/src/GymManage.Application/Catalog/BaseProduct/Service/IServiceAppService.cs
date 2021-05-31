
using GymManage.Catalog.Service.Request;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GymManage.Catalog.Service
{
    public interface IServiceAppService
    {
        Task<List<ServiceViewModel>> GetAllService(GetServiceRequest request);

        Task CreateOrUpdateService(CreateOrUpdateServiceRequest request);

        Task DeleteService(int id);
    }
}
