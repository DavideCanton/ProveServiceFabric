using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Backend
{
    public class Request
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public List<Address> Addresses { get; set; }
    }

    public class Address
    {
        public string Street { get; set; }
        public int Number { get; set; }
    }

    public class Response
    {
        public string FullName { get; set; }
        public List<Address> Addresses { get; set; }
    }

    public interface IHttpCaller
    {
        Task<string> GetResponse(int id);
        Response Compute(Request req);
    }

    public class HttpCaller : IHttpCaller
    {
        public Response Compute(Request req)
        {
            return new Response
            {
                FullName = $"{req.Surname} {req.Name}",
                Addresses = req.Addresses.SelectMany(a =>
                {
                    return Enumerable.Range(a.Number, 2).Select(i => new Address
                    {
                        Street = $"VIA {a.Street}",
                        Number = i
                    });
                }).ToList()
            };
        }

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
