using Abp.Domain.Repositories;
using GymManage.Catalog.Customer.Request;
using GymManage.Customer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManage.Catalog.Customer
{
    public class CustomerAppService : GymManageAppServiceBase, ICustomerAppService
    {
        private readonly IRepository<CustomerEntity> _customerRepos;
        public CustomerAppService(IRepository<CustomerEntity> customerRepos)
        {
            _customerRepos = customerRepos;
        }

        public async Task CreateOrUpdateCustomer(CreateOrUpdateCustomerRequest request)
        {
            var data = new CustomerEntity
            {              
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Adress = request.Adress,
                Born = request.Born,
                UserName = request.UserName,
                Password = request.Password,
                Email = request.Email
            };

            if (request.Id > 0)
            {
                data.Id = request.Id.Value;
                await _customerRepos.UpdateAsync(data);
            }
            else
            {
                await _customerRepos.InsertAsync(data);
            }
        }

        public async Task DeleteCustomer(int id)
        {
            var data = await _customerRepos.GetAsync(id);
            await _customerRepos.DeleteAsync(data);
        }

        public async Task<List<CustomerViewModel>> GetAllCustomer(GetCustomerRequest request)
        {
            if (!string.IsNullOrEmpty(request.Keyword))
            {
                var data = await _customerRepos.GetAll()
                .Where(x => x.Name.Contains(request.Keyword))
                .Select(x => new CustomerViewModel
                {
                   Id = x.Id,
                   Name = x.Name,
                   PhoneNumber = x.PhoneNumber,
                   Adress = x.Adress,
                   Born = x.Born,
                   UserName = x.UserName,
                   Password = x.Password,
                   Email = x.Email
                }).ToListAsync();
                return data;
            }
            else
            {
                var data = await _customerRepos.GetAll()
                .Select(x => new CustomerViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    PhoneNumber = x.PhoneNumber,
                    Adress = x.Adress,
                    Born = x.Born,
                    UserName = x.UserName,
                    Password = x.Password,
                    Email = x.Email
                }).ToListAsync();
                return data;
            }
        }

        public async Task<List<CustomerViewModel>> GetCustomerById(int id)
        {
            var data = await _customerRepos.GetAll()
                .Where(x => x.Id == id)
                .Select(x => new CustomerViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    PhoneNumber = x.PhoneNumber,
                    Adress = x.Adress,
                    Born = x.Born,
                    UserName = x.UserName,
                    Password = x.Password,
                    Email = x.Email
                }).ToListAsync();
            return data;
        }

        [HttpGet]
        public async Task<bool> Login(string userName, string password)
        {
            var data = await _customerRepos.GetAll()
                .Where(x => x.UserName == userName && x.Password == password)
                .Select(x => new CustomerViewModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    PhoneNumber = x.PhoneNumber,
                    Adress = x.Adress,
                    Born = x.Born,
                    UserName = x.UserName,
                    Password = x.Password,
                    Email = x.Email
                }).ToListAsync();

            if(data.Count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
