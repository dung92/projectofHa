using GymManage.Catalog.TimeManage.SessionWork.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.SessionWork
{
    public interface ISessionWorkAppService
    {
        Task<List<SessionWorkViewModel>> GetAllSessionWork(GetSessionRequest request);

        Task DeleteSessionWork(int id);

        Task CreateOrUpdateSessionWork(CreateOrUpdateSessionWork request);
    }
}
