using System.Threading.Tasks;
using Abp.Application.Services;
using GymManage.Sessions.Dto;

namespace GymManage.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
