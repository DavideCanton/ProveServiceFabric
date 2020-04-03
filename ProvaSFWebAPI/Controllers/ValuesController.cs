using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace ProvaSFWebAPI.Controllers
{
    public class GetInput
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }

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
        public async Task<ActionResult<IEnumerable<string>>> Get([FromQuery] GetInput input)
        {
            var client = Factory.CreateServiceProxy<IBackend>(BackendUri);
            return Ok(await client.GetValues(input.Id));
        }
    }
}
