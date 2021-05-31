using Abp.AutoMapper;
using Abp.Domain.Repositories;
using GymManage.Catalog.Service.Request;
using GymManage.Product;
using GymManage.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Service
{
    public class ServiceAppService : GymManageAppServiceBase, IServiceAppService
    {
        private readonly IRepository<ServiceEntity> _serviceRepos;
        public ServiceAppService(IRepository<ServiceEntity> serviceRepos)
        {
            _serviceRepos = serviceRepos;
        }
        public async Task CreateOrUpdateService(CreateOrUpdateServiceRequest request)
        {
            var data = new ServiceEntity
            {
                Name = request.Name,
                Description = request.Description
            };

            if(request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _serviceRepos.UpdateAsync(data);
            }
            else
            {
                await _serviceRepos.InsertAsync(data);
            }
        }

        public async Task DeleteService(int id)
        {
            var data = await _serviceRepos.GetAsync(id);
            await _serviceRepos.DeleteAsync(data);
        }

        public async Task<List<ServiceViewModel>> GetAllService(GetServiceRequest request)
        {
            if(!string.IsNullOrEmpty(request.KeyWord))
            {
                var data = await _serviceRepos.GetAll()
                .Where(x => x.Name.Contains(request.KeyWord))
                .Select(x => new ServiceViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToListAsync();
                return data;
            }
            else
            {
                var data = await _serviceRepos.GetAll()             
                .Select(x => new ServiceViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToListAsync();
                return data;
            }           
        }
    }
}
