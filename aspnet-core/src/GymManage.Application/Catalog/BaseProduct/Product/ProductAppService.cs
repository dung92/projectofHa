using Abp.AutoMapper;
using Abp.Domain.Repositories;
using GymManage.Catalog.Product.Request;
using GymManage.Product;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Product
{
    public class ProductAppService : GymManageAppServiceBase, IServiceAppService
    {
        private readonly IRepository<ProductEntity> _productRepos;
        public ProductAppService(IRepository<ProductEntity> productRepos)
        {
            _productRepos = productRepos;
        }
        public async Task CreateOrUpdateProduct(CreateOrUpdateProductRequest request)
        {
            var data = new ProductEntity
            {
                Name = request.Name,
                Description = request.Description
            };

            if(request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _productRepos.UpdateAsync(data);
            }
            else
            {
                await _productRepos.InsertAsync(data);
            }
        }

        public async Task DeleteProduct(int id)
        {
            var data = await _productRepos.GetAsync(id);
            await _productRepos.DeleteAsync(data);
        }

        public async Task<List<ProductViewModel>> GetAllProduct(GetProductRequest request)
        {
            if(!string.IsNullOrEmpty(request.KeyWord))
            {
                var data = await _productRepos.GetAll()
                .Where(x => x.Name.Contains(request.KeyWord))
                .Select(x => new ProductViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToListAsync();
                return data;
            }
            else
            {
                var data = await _productRepos.GetAll()             
                .Select(x => new ProductViewModel
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
