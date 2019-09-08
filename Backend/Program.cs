using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading;
using Autofac;
using Autofac.Integration.ServiceFabric;

namespace Backend
{
    internal static class Program
    {
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<Backend>("BackendType");

                builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).PublicOnly().AsImplementedInterfaces();

                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(
                      Process.GetCurrentProcess().Id,
                      typeof(Backend).Name);

                    Thread.Sleep(Timeout.Infinite);
                }
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.ServiceHostInitializationFailed(e.ToString());
                throw;
            }
        }
    }
}
