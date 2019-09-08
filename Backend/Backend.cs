using System.Collections.Generic;
using System.Fabric;
using System.Threading.Tasks;
using Interfaces;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using System.Linq;

namespace Backend
{
    public class Backend : StatelessService, IBackend
    {
        private readonly ILogic logic;

        public Backend(StatelessServiceContext context, ILogic logic)
            : base(context)
        {
            this.logic = logic;
        }

        public async Task<string[]> GetValues(int id)
        {
            return (await logic.GetValuesAsync(id)).Select(j => j.Value<string>("title")).ToArray();
        }

        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            return this.CreateServiceRemotingInstanceListeners();
        }
    }
}
