using GymManage.Catalog.BaseProduct.Option.Request;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace GymManage.Catalog.BaseProduct.Option
{
    public interface IOptionAppService
    {
        Task<List<OptionViewModel>> GetAllOption(GetOptionRequest request);

        Task CreateOrUpdateOption(CreateOrUpdateOptionRequest request);

        Task DeleteOption(int id);
    }
}
