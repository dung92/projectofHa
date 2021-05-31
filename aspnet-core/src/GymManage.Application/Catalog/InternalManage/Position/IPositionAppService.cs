using GymManage.Catalog.InternalManage.Position.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Position
{
    public interface IPositionAppService
    {
        Task<List<PositionViewModel>> GetAllPosition(GetPositionRequest request);

        Task CreateOrUpdatePosition(CreateOrUpdatePositionRequest request);

        Task DeletePosition(int id);
    }
}
