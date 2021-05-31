using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using GymManage.Authorization.Users;
using GymManage.Bill;
using GymManage.Catalog.MainAction.Bill.Request;
using GymManage.Customer;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.MainAction.Bill
{
    public class BillAppService : GymManageAppServiceBase, IBillAppService
    {
        private readonly IRepository<BillEntity> _billRepos;
        private readonly IRepository<CustomerEntity> _customerRepos;
        private readonly IAbpSession _session;
        private readonly UserManager _userManager;

        public BillAppService(
            IRepository<BillEntity> billRepos, 
            IRepository<CustomerEntity> customerRepos,
            IAbpSession session,
            UserManager userManager)
        {
            _billRepos = billRepos;
            _customerRepos = customerRepos;
            _session = session;
            _userManager = userManager;
        }
        public async Task<int> CreateOrUpdateBill(CreateOrUpdateBillRequest request)
        {
            var user = _userManager.FindByIdAsync(_session.UserId.ToString());
            var userName = user.Result.UserName;
            var data = new BillEntity
            {
                Name = request.Name,
                DateCreated = DateTime.Now,
                UserCreated = userName,
                OriginalPrice = request.OriginalPrice,
                Discount = request.Discount,
                TotalPrice = request.TotalPrice,
                Note = request.Note,
                CustomerId = request.CustomerId
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _billRepos.UpdateAsync(data);
                return data.Id;
            }
            else
            {
                return await _billRepos.InsertAndGetIdAsync(data);
            }

           
        }

        public async Task DeleteBill(int id)
        {
            var data = await _billRepos.GetAsync(id);
            await _billRepos.DeleteAsync(data);
        }

        public async Task<List<BillViewModel>> GetAllBill(GetBillRequest request)
        {
            var billQuery = _billRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();

            var query = from b in billQuery
                        join c in customerQuery on b.CustomerId equals c.Id
                        select new { b, c };

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.c.Name.ToLower().Trim().Contains(request.Keyword)
                            || x.c.PhoneNumber.Contains(request.Keyword)
                            || x.b.UserCreated.ToLower().Trim().Contains(request.Keyword));                     
            }

            if(request.FromDateFilter != null)
            {
                query = query.Where(x => DateTime.Compare(request.FromDateFilter.Value, x.b.DateCreated) < 0);
            }

            if(request.ToDateFilter != null)
            {
                query = query.Where(x => DateTime.Compare(request.ToDateFilter.Value, x.b.DateCreated) > 0);
            }

            var data = await query.Select(x => new BillViewModel()
            {
                Id = x.b.Id,
                Name = x.b.Name,
                DateCreated = x.b.DateCreated,
                UserCreated = x.b.UserCreated,
                OriginalPrice = x.b.OriginalPrice,
                Discount = x.b.Discount,
                TotalPrice = x.b.TotalPrice,
                Note = x.b.Note,
                CustomerId = x.b.CustomerId,
                CustomerName = x.c.Name,
                CustomerPhoneNumber = x.c.PhoneNumber
            }).ToListAsync();

            return data;
        }
    }
}
