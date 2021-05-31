using Abp.Domain.Repositories;
using GymManage.Catalog.ProductCategory.Request;
using GymManage.Option;
using GymManage.Product;
using GymManage.ProductCategory;
using GymManage.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductCategory
{
    public class ProductCategoryAppService : GymManageAppServiceBase, IProductCategoryAppService
    {
        private readonly IRepository<ProductCategoryEntity> _productCategoryRepos;
        private readonly IRepository<ProductEntity> _productRepos;
        private readonly IRepository<OptionEntity> _optionRepos;
        private readonly IRepository<ServiceEntity> _serviceRepos;
        public ProductCategoryAppService(
            IRepository<ProductCategoryEntity> productCategoryRepos,
            IRepository<ProductEntity> productRepos,
            IRepository<OptionEntity> optionRepos,
            IRepository<ServiceEntity> serviceRepos
            )
        {
            _productCategoryRepos = productCategoryRepos;
            _productRepos = productRepos;
            _optionRepos = optionRepos;
            _serviceRepos = serviceRepos;
        }

        public async Task CreateOrUpdateProductCategory(CreateOrUpdateProductCategoryRequest request)
        {
            var data = new ProductCategoryEntity
            {
                OptionId = request.OptionId,
                ProductId = request.ProductId,
                ServiceId = request.ServiceId,
                Price = request.Price
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _productCategoryRepos.UpdateAsync(data);
            }
            else
            {
                await _productCategoryRepos.InsertAsync(data);
            }
        }

        public async Task DeleteProductCategory(int id)
        {
            var data = await _productCategoryRepos.GetAsync(id);
            await _productCategoryRepos.DeleteAsync(data);
        }

        public async Task<List<ProductCategoryViewModel>> GetAllProductCategory(GetProductCategoryRequest request)
        {
            var productQuery = _productRepos.GetAll();
            var productCategoryQuery = _productCategoryRepos.GetAll();
            var optionQuery = _optionRepos.GetAll();
            var serviceQuery = _serviceRepos.GetAll();

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                var query = from pc in productCategoryQuery
                            join p in productQuery on pc.ProductId equals p.Id
                            join o in optionQuery on pc.OptionId equals o.Id
                            join s in serviceQuery on pc.ServiceId equals s.Id
                            where (p.Name.Contains(request.Keyword) || o.Name.Contains(request.Keyword) || s.Name.Contains(request.Keyword))
                            select new ProductCategoryViewModel
                            {
                                Id = pc.Id,
                                ProductId = p.Id,
                                ProductName = p.Name,
                                ServiceId = s.Id,
                                ServiceName = s.Name,
                                OptionId = o.Id,
                                Amount = o.Amount,
                                Unit = o.Unit,
                                OptionName = o.Name,
                                Price = pc.Price
                            };

                var data = await query.ToListAsync();
                return data;
            }
            else
            {
                var query = from pc in productCategoryQuery
                            join p in productQuery on pc.ProductId equals p.Id
                            join o in optionQuery on pc.OptionId equals o.Id
                            join s in serviceQuery on pc.ServiceId equals s.Id                           
                            select new ProductCategoryViewModel
                            {
                                Id = pc.Id,
                                ProductId = p.Id,
                                ProductName = p.Name,
                                ServiceId = s.Id,
                                ServiceName = s.Name,
                                OptionId = o.Id,
                                Amount = o.Amount,
                                Unit = o.Unit,
                                OptionName = o.Name,
                                Price = pc.Price
                            };

                var data = await query.ToListAsync();
                return data;
            }

        }

        public async Task<List<ProductCategoryViewModel>> GetProductCategoryById(GetProductCategoryById request)
        {
            var productQuery = _productRepos.GetAll();
            var productCategoryQuery = _productCategoryRepos.GetAll();
            var optionQuery = _optionRepos.GetAll();
            var serviceQuery = _serviceRepos.GetAll();

            var query = from pc in productCategoryQuery
                        join p in productQuery on pc.ProductId equals p.Id
                        join o in optionQuery on pc.OptionId equals o.Id
                        join s in serviceQuery on pc.ServiceId equals s.Id
                        select new { p, pc, s, o, };
            
            if(request.productId != null)
            {
                query = query.Where(x => x.p.Id == request.productId.Value);               
            }

            if (request.serviceId != null)
            {
                query = query.Where(x => x.s.Id == request.serviceId.Value);
            }

            if (request.optionId != null)
            {
                query = query.Where(x => x.o.Id == request.optionId.Value);
            }

            var data = await query.Select(x => new ProductCategoryViewModel()
            {
                Id = x.pc.Id,
                ProductId = x.p.Id,
                ProductName = x.p.Name,
                ServiceId = x.s.Id,
                ServiceName = x.s.Name,
                OptionId = x.o.Id,
                Amount = x.o.Amount,
                Unit = x.o.Unit,
                OptionName = x.o.Name,
                Price = x.pc.Price
            }).ToListAsync();

            return data;
        }
        
    }
}
