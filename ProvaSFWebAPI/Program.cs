using Autofac;
using Autofac.Integration.ServiceFabric;
using System;
using System.Diagnostics;
using System.Threading;

namespace ProvaSFWebAPI
{
    internal static class Program
    {
        /// <summary>
        /// Questo è il punto di ingresso del processo host del servizio.
        /// </summary>
        private static void Main()
        {
            try
            {
                var builder = new ContainerBuilder();

                builder.RegisterServiceFabricSupport();
                builder.RegisterStatelessService<ProvaSFWebAPI>("ProvaSFWebAPIType");
                using (builder.Build())
                {
                    ServiceEventSource.Current.ServiceTypeRegistered(
                      Process.GetCurrentProcess().Id,
                      typeof(ProvaSFWebAPI).Name);

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
