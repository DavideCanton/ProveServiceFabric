
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend
{
    public interface ILogic
    {
        Task<IEnumerable<JObject>> GetValuesAsync(int id);
    }

    public class Logic : ILogic
    {
        private readonly IHttpCaller httpCaller;
        private readonly ILogger logger;

        public Logic(IHttpCaller httpCaller, ILogger logger)
        {
            this.httpCaller = httpCaller;
            this.logger = logger;
        }

        public virtual async Task<IEnumerable<JObject>> GetValuesAsync(int id)
        {
            logger.Log($"Calling with id {id}...");
            string msg = await httpCaller.GetResponse(id);
            var list = JArray.Parse(msg);
            logger.Log($"End id {id}!");
            return list.Values<JObject>();
        }
    }
}
