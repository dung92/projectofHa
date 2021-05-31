using Abp.Domain.Repositories;
using GymManage.AppEntity.SessionWork;
using GymManage.Catalog.TimeManage.SessionWork.Request;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.TimeManage.SessionWork
{
    public class SessionWorkAppService : GymManageAppServiceBase, ISessionWorkAppService
    {
        private readonly IRepository<SessionWorkEntity> _sesionRepos;
        public SessionWorkAppService(IRepository<SessionWorkEntity> sesionRepos)
        {
            _sesionRepos = sesionRepos;
        }
        public async Task CreateOrUpdateSessionWork(CreateOrUpdateSessionWork request)
        {
            var data = new SessionWorkEntity
            {
                Name = request.Name,
                FromTime = request.FromTime,
                ToTime = request.ToTime
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _sesionRepos.UpdateAsync(data);
            }
            else
            {
                await _sesionRepos.InsertAsync(data);
            }
        }

        public async Task DeleteSessionWork(int id)
        {
            var data = await _sesionRepos.GetAsync(id);
            await _sesionRepos.DeleteAsync(data);
        }

        public async Task<List<SessionWorkViewModel>> GetAllSessionWork(GetSessionRequest request)
        {
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                var data = await _sesionRepos.GetAll()
                .Where(x => x.Name.Contains(request.Keyword))
                .Select(x => new SessionWorkViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    FromTime = x.FromTime,
                    ToTime = x.ToTime
                }).ToListAsync();
                return data;
            }
            else
            {
                var data = await _sesionRepos.GetAll()
                .Select(x => new SessionWorkViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    FromTime = x.FromTime,
                    ToTime = x.ToTime
                }).ToListAsync();
                return data;
            }
        }
    }
}
