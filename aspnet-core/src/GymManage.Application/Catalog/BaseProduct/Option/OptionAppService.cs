using Abp.Domain.Repositories;
using GymManage.Catalog.BaseProduct.Option.Request;
using GymManage.Option;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymManage.Catalog.BaseProduct.Option
{
    public class OptionAppService : GymManageAppServiceBase, IOptionAppService
    {
        private readonly IRepository<OptionEntity> _optionRepos;
        public OptionAppService(IRepository<OptionEntity> optionRepos)
        {
            _optionRepos = optionRepos;
        }
        public async Task CreateOrUpdateOption(CreateOrUpdateOptionRequest request)
        {
            var data = new OptionEntity
            {
                Name = request.Name,
                Amount = request.Amount,
                Unit = request.Unit,
                Description = request.Description
            };

            if(request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _optionRepos.UpdateAsync(data);
            }
            else
            {
                await _optionRepos.InsertAsync(data);
            }

        }

        public async Task DeleteOption(int id)
        {
            var data = await _optionRepos.GetAsync(id);
            await _optionRepos.DeleteAsync(data);
        }

        public async Task<List<OptionViewModel>> GetAllOption(GetOptionRequest request)
        {
            if(!string.IsNullOrEmpty(request.KeyWord))
            {
                var data = await _optionRepos.GetAll()
                .Where(x => x.Name.Contains(request.KeyWord))
                .Select(x => new OptionViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Amount = x.Amount,
                    Unit = x.Unit,
                    Description = x.Description
                }).ToListAsync();
                return data;
            }
            else
            {
                var data = await _optionRepos.GetAll()             
                .Select(x => new OptionViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Amount = x.Amount,
                    Unit = x.Unit,
                    Description = x.Description
                }).ToListAsync();
                return data;
            }           
        }
    }
}
