using Abp.AutoMapper;
using GymManage.Service;

namespace GymManage.Catalog.Service.Request
{
    [AutoMapTo(typeof(ServiceEntity))]
    public class CreateOrUpdateServiceRequest : ServiceViewModel
    {
        
    }
}
