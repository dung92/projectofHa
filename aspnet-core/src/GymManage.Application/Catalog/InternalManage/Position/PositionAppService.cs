using Abp.Domain.Repositories;
using GymManage.Catalog.InternalManage.Position.Request;
using GymManage.EmployeePosition;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.InternalManage.Position
{
    public class PositionAppService : GymManageAppServiceBase, IPositionAppService
    {
        private readonly IRepository<EmployeePositionEntity> _positionRepos;
        public PositionAppService(IRepository<EmployeePositionEntity> positionRepos)
        {
            _positionRepos = positionRepos;
        }
        public async Task CreateOrUpdatePosition(CreateOrUpdatePositionRequest request)
        {
            var data = new EmployeePositionEntity
            {
                Name = request.Name,
                Description = request.Description,
                BaseSalary = request.BaseSalary,
                Bonus = request.Bonus
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _positionRepos.UpdateAsync(data);
            }
            else
            {
                await _positionRepos.InsertAsync(data);
            }
        }

        public async Task DeletePosition(int id)
        {
            var data = await _positionRepos.GetAsync(id);
            await _positionRepos.DeleteAsync(data);
        }

        public async Task<List<PositionViewModel>> GetAllPosition(GetPositionRequest request)
        {
            if(!string.IsNullOrEmpty(request.Keyword))
            {
                var data = await _positionRepos.GetAll().Where(x => x.Name.Contains(request.Keyword)).Select(x => new PositionViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    BaseSalary = x.BaseSalary,
                    Bonus = x.Bonus
                }).ToListAsync();

                return data;
            }
            else
            {
                var data = await _positionRepos.GetAll().Select(x => new PositionViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    BaseSalary = x.BaseSalary,
                    Bonus = x.Bonus
                }).ToListAsync();

                return data;
            }
            
        }
    }
}
