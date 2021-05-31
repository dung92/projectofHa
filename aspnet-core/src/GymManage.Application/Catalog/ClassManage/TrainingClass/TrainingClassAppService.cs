
using Abp.Domain.Repositories;
using GymManage.Catalog.ClassManage.TrainingClass.Request;
using GymManage.Product;
using GymManage.TrainingClass;
using GymManage.TrainingClassCategory;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClass
{
    public class TrainingClassAppService : GymManageAppServiceBase, ITrainingClassAppService
    {
        private readonly IRepository<TrainingClassCategoryEntity> _classCategoryRepos;
        private readonly IRepository<TrainingClassEntity> _classRepos;
        private readonly IRepository<ProductEntity> _productRepos;
        public TrainingClassAppService(
            IRepository<TrainingClassCategoryEntity> classCategoryRepos, 
            IRepository<TrainingClassEntity> classRepos, 
            IRepository<ProductEntity> productRepos)
        {
            _classCategoryRepos = classCategoryRepos;
            _classRepos = classRepos;
            _productRepos = productRepos;
        }
        public async Task CreateOrUpdateTrainingClass(CreateOrUpdateTrainingClassRequest request)
        {
            var data = new TrainingClassEntity
            {
                Name = request.Name,
                TrainingClassCategoryId = request.TrainingClassCategoryId
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _classRepos.UpdateAsync(data);
            }
            else
            {
                await _classRepos.InsertAsync(data);
            }
        }

        public async Task DeleteTrainingClass(int id)
        {
            var data = await _classRepos.GetAsync(id);
            await _classRepos.DeleteAsync(data);
        }

        public async Task<List<TrainingClassViewModel>> GetAllTrainingClass(GetTrainingClassRequest request)
        {
            var classQuery = _classRepos.GetAll();
            var productQuery = _productRepos.GetAll();
            var trainignClassCategoryQuery = _classCategoryRepos.GetAll();

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                var query = from c in classQuery
                            join t in trainignClassCategoryQuery on c.TrainingClassCategoryId equals t.Id
                            join p in productQuery on t.ProductId equals p.Id
                            where (c.Name.Contains(request.Keyword))
                            select new TrainingClassViewModel
                            {
                                Id = c.Id,
                                Name = c.Name,
                                TrainingClassCategoryId = c.TrainingClassCategoryId,
                                TrainingClassCategoryName = t.Name,
                                ProductName = p.Name
                            };

                var data = await query.ToListAsync();
                return data;
            }
            else
            {
                var query = from c in classQuery
                            join t in trainignClassCategoryQuery on c.TrainingClassCategoryId equals t.Id
                            join p in productQuery on t.ProductId equals p.Id
                            select new TrainingClassViewModel
                            {
                                Id = c.Id,
                                Name = c.Name,
                                TrainingClassCategoryId = c.TrainingClassCategoryId,
                                TrainingClassCategoryName = t.Name,
                                ProductName = p.Name
                            };

                var data = await query.ToListAsync();
                return data;
            }
        }

        public async Task<List<TrainingClassViewModel>> GetTrainingClassById(GetTrainingClassByIdRequest request)
        {
            var classQuery = _classRepos.GetAll();
            var productQuery = _productRepos.GetAll();
            var trainignClassCategoryQuery = _classCategoryRepos.GetAll();

            var query = from c in classQuery
                        join t in trainignClassCategoryQuery on c.TrainingClassCategoryId equals t.Id
                        join p in productQuery on t.ProductId equals p.Id
                        select new { c, t, p };

            if (request.productId != null)
            {
                query = query.Where(x => x.t.ProductId == request.productId.Value);
            }

            if (request.trainingClassCategoryId != null)
            {
                query = query.Where(x => x.c.TrainingClassCategoryId == request.trainingClassCategoryId.Value);
            }

            var data = await query.Select(x => new TrainingClassViewModel()
            {
                Id = x.c.Id,
                Name = x.c.Name,
                TrainingClassCategoryId = x.c.TrainingClassCategoryId,
                TrainingClassCategoryName = x.t.Name,
                ProductName = x.p.Name
            }).ToListAsync();

            return data;
        }
    }
}
