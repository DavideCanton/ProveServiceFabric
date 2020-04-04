using Autofac;
using Autofac.Integration.ServiceFabric;
using System;
using System.Diagnostics;
using System.Threading;

namespace ProvaSFFrontend
{
    public class Program
    {
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<ProvaSFFrontend>("ProvaSFFrontendType");
                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(
                      Process.GetCurrentProcess().Id,
                      typeof(ProvaSFFrontend).Name);

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