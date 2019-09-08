using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProvaSFWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public IServiceProxyFactory Factory { get; }
        private readonly Uri BackendUri = new Uri("fabric:/ProvaSF/Backend");

        public ValuesController(IServiceProxyFactory factory)
        {
            Factory = factory;
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<string>), 200)]
        [ProducesResponseType(typeof(JObject), 400)]
        public async Task<ActionResult<IEnumerable<string>>> Get(int id = 1)
        {
            var client = Factory.CreateServiceProxy<IBackend>(BackendUri);
            return Ok(await client.GetValues(id));
        }
    }
}
