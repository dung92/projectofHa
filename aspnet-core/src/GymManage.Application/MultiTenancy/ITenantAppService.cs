using Abp.Application.Services;
using GymManage.MultiTenancy.Dto;

namespace GymManage.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

