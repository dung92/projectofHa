using System.Threading.Tasks;
using Abp.Application.Services;
using GymManage.Authorization.Accounts.Dto;

namespace GymManage.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
