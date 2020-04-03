using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System.Collections.Generic;

namespace ProvaSFWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Prova SF API",
                    Version = "v1"
                });
            });

            services.AddSingleton<IServiceProxyFactory>(provider => new ServiceProxyFactory());
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = false;
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var basePath = "/ProvaSF/ProvaSFWebAPI";

            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseSwagger(c =>
            {
                c.PreSerializeFilters.Add((swaggerDoc, httpReq) =>
                {
                    swaggerDoc.Servers = new List<OpenApiServer> {
                        new OpenApiServer { Url = $"{httpReq.Scheme}://localhost:19081{basePath}" }
                    };
                });
            });

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
            });

            app.UseMvc();
        }
    }
}
