using Abp.Domain.Repositories;
using GymManage.Catalog.ClassManage.TrainingClassCategory.Request;
using GymManage.Product;
using GymManage.TrainingClassCategory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ClassManage.TrainingClassCategory
{
    public class TrainingClassCategoryAppService : GymManageAppServiceBase, ITrainingClassCategoryAppService
    {
        private readonly IRepository<TrainingClassCategoryEntity> _classCategoryRepos;
        private readonly IRepository<ProductEntity> _productRepos;
        public TrainingClassCategoryAppService(IRepository<TrainingClassCategoryEntity> classCategoryRepos, IRepository<ProductEntity> productRepos)
        {
            _classCategoryRepos = classCategoryRepos;
            _productRepos = productRepos;
        }
        public async Task CreateOrUpdateTrainingClassCategory(CreateOrUpdateTrainingClassCategoryRequest request)
        {
            var data = new TrainingClassCategoryEntity
            {
                Name = request.Name,
                Description = request.Description,
                ProductId = request.ProductId
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _classCategoryRepos.UpdateAsync(data);
            }
            else
            {
                await _classCategoryRepos.InsertAsync(data);
            }
        }

        public async Task DeleteTrainingClassCategory(int id)
        {
            var data = await _classCategoryRepos.GetAsync(id);
            await _classCategoryRepos.DeleteAsync(data);
        }

        public async Task<List<TrainingClassCategoryViewModel>> GetAllTrainingClassCategory(GetTrainingClassCategoryRequest request)
        {
            var productQuery = _productRepos.GetAll();
            var trainignClassCategoryQuery = _classCategoryRepos.GetAll();

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                var query = from t in trainignClassCategoryQuery
                            join p in productQuery on t.ProductId equals p.Id
                            where (p.Name.Contains(request.Keyword) || t.Name.Contains(request.Keyword))
                            select new TrainingClassCategoryViewModel
                            {
                                Id = t.Id,
                                Name = t.Name,
                                Description = t.Description,
                                ProductId = p.Id,
                                ProductName = p.Name,

                            };

                var data = await query.ToListAsync();
                return data;
            }
            else
            {
                var query = from t in trainignClassCategoryQuery
                            join p in productQuery on t.ProductId equals p.Id
                            select new TrainingClassCategoryViewModel
                            {
                                Id = t.Id,
                                Name = t.Name,
                                Description = t.Description,
                                ProductId = p.Id,
                                ProductName = p.Name,

                            };

                var data = await query.ToListAsync();
                return data;
            }
        }
    }
}
