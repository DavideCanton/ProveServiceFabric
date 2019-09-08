using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Threading.Tasks;

namespace Interfaces
{
    public interface IBackend: IService
    {
        Task<string[]> GetValues(int id);
    }
}
