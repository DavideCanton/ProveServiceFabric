using System.Net.Http;
using System.Threading.Tasks;

namespace Backend
{
    public interface IHttpCaller
    {
        Task<string> GetResponse(int id);
    }

    public class HttpCaller : IHttpCaller
    {
        public async Task<string> GetResponse(int id)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("User-Agent", "Prova");

                var resp = await client.GetAsync($"https://jsonplaceholder.typicode.com/posts?userId={id}");
                var msg = await resp.Content.ReadAsStringAsync();
                return msg;
            }
        }
    }
}
