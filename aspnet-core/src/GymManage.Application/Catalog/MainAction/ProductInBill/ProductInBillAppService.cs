using Abp.Domain.Repositories;
using GymManage.Bill;
using GymManage.Catalog.ProductInBill.Request;
using GymManage.Customer;
using GymManage.Option;
using GymManage.Product;
using GymManage.ProductCategory;
using GymManage.ProductInBill;
using GymManage.Service;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.ProductInBill
{
    public class ProductInBillAppService : GymManageAppServiceBase, IProductInBillAppService
    {
        private readonly IRepository<ProductInBillEntity> _productInBillRepos;
        private readonly IRepository<ProductCategoryEntity> _productCategoryRepos;
        private readonly IRepository<BillEntity> _BillRepos;
        private readonly IRepository<ProductEntity> _productRepos;
        private readonly IRepository<OptionEntity> _optionRepos;
        private readonly IRepository<ServiceEntity> _serviceRepos;
        private readonly IRepository<CustomerEntity> _customerRepos;
        public ProductInBillAppService(
            IRepository<ProductInBillEntity> productInBillRepos,
            IRepository<ProductCategoryEntity> productCategoryRepos,
            IRepository<ProductEntity> productRepos,
            IRepository<OptionEntity> optionRepos,
            IRepository<ServiceEntity> serviceRepos,
            IRepository<CustomerEntity> customerRepos,
            IRepository<BillEntity> BillRepos)
        {
            _productInBillRepos = productInBillRepos;
            _productCategoryRepos = productCategoryRepos;
            _BillRepos = BillRepos;
            _productRepos = productRepos;
            _optionRepos = optionRepos;
            _serviceRepos = serviceRepos;
            _customerRepos = customerRepos;
        }
        public async Task CreateOrUpdateProductInBill(CreateOrUpdateProductInBillRequest request)
        {
            var data = new ProductInBillEntity
            {
                ProductCategoryId = request.ProductCategoryId,
                BillId = request.BillId,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _productInBillRepos.UpdateAsync(data);
            }
            else
            {
                await _productInBillRepos.InsertAsync(data);
            }
        }

        public async Task DeleteProductInBill(int id)
        {
            var data = await _productInBillRepos.GetAsync(id);
            await _productInBillRepos.DeleteAsync(data);
        }

        public async Task<List<ProductInBillViewModel>> GetAllProductInBill(GetProductInBillRequest request)
        {
            var billQuery = _BillRepos.GetAll();
            var productInBillQuery = _productInBillRepos.GetAll();
            var productCategoryQuery = _productCategoryRepos.GetAll();
            var productQuery = _productRepos.GetAll();
            var optionQuery = _optionRepos.GetAll();
            var serviceQuery = _serviceRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();

            var query = from pb in productInBillQuery
                        join pc in productCategoryQuery on pb.ProductCategoryId equals pc.Id
                        join b in billQuery on pb.BillId equals b.Id
                        join p in productQuery on pc.ProductId equals p.Id
                        join o in optionQuery on pc.OptionId equals o.Id
                        join s in serviceQuery on pc.ServiceId equals s.Id
                        join c in customerQuery on b.CustomerId equals c.Id

                        select new { pb, b, pc, p, o, s, c };

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.b.Name.Contains(request.Keyword));
            }


            var data = await query.Select(x => new ProductInBillViewModel()
            {
                Id = x.pb.Id,
                ProductCategoryId = x.pb.ProductCategoryId,
                BillId = x.pb.BillId,
                CustomerId = x.b.CustomerId,
                CustomerName = x.c.Name,
                CustomerPhoneNumber = x.c.PhoneNumber,
                BillName = x.b.Name,
                DateCreated = x.b.DateCreated,
                OriginalPrice = x.b.OriginalPrice,
                Discount = x.b.Discount,
                TotalPrice = x.b.TotalPrice,
                UserCreated = x.b.UserCreated,
                Note = x.b.Note,
                ProductName = x.p.Name,
                OptionName = x.o.Name,
                ServiceName = x.s.Name,
                FromDate = x.pb.FromDate,
                ToDate = x.pb.ToDate

            }).ToListAsync();

            return data;
        }

        public async Task<List<ProductInBillViewModel>> GetProductInBillByCustomerId(int customerId)
        {
            var billQuery = _BillRepos.GetAll();
            var productInBillQuery = _productInBillRepos.GetAll();
            var productCategoryQuery = _productCategoryRepos.GetAll();
            var productQuery = _productRepos.GetAll();
            var optionQuery = _optionRepos.GetAll();
            var serviceQuery = _serviceRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();

            var query = from pb in productInBillQuery
                        join pc in productCategoryQuery on pb.ProductCategoryId equals pc.Id
                        join b in billQuery on pb.BillId equals b.Id
                        join p in productQuery on pc.ProductId equals p.Id
                        join o in optionQuery on pc.OptionId equals o.Id
                        join s in serviceQuery on pc.ServiceId equals s.Id
                        join c in customerQuery on b.CustomerId equals c.Id                     
                        select new { pb, b, pc, p, o, s, c };

            query = query.Where(x => x.b.CustomerId == customerId);

            var data = await query.Select(x => new ProductInBillViewModel()
            {
                Id = x.pb.Id,
                ProductCategoryId = x.pb.ProductCategoryId,
                BillId = x.pb.BillId,
                CustomerId = x.b.CustomerId,
                CustomerName = x.c.Name,
                CustomerPhoneNumber = x.c.PhoneNumber,
                BillName = x.b.Name,
                DateCreated = x.b.DateCreated,
                OriginalPrice = x.b.OriginalPrice,
                Discount = x.b.Discount,
                TotalPrice = x.b.TotalPrice,
                UserCreated = x.b.UserCreated,
                Note = x.b.Note,
                ProductName = x.p.Name,
                OptionName = x.o.Name,
                ServiceName = x.s.Name,
                FromDate = x.pb.FromDate,
                ToDate = x.pb.ToDate

            }).ToListAsync();

            return data;
        }
    }
}
