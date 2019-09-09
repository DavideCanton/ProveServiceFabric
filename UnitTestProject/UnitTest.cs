using Microsoft.VisualStudio.TestTools.UnitTesting;
using ServiceFabric.Mocks;
using System.Threading.Tasks;
using Shouldly;
using Moq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using Backend;
using Autofac;
using Autofac.Extras.Moq;
using Autofac.Integration.ServiceFabric;
using Newtonsoft.Json;

namespace UnitTestProject
{
    [TestClass]
    public class UnitTest
    {
        [TestMethod]
        public async Task TestMethod()
        {
            using (var mock = AutoMock.GetStrict())
            {
                var mockHttp = mock.Mock<IHttpCaller>();
                mockHttp.Setup(m => m.GetResponse(1)).ReturnsAsync(JsonConvert.SerializeObject(new List<JObject>()
                {
                    BuildObject("a"),
                    BuildObject("b"),
                    BuildObject("c"),
                    BuildObject("d"),
                }));
                mock.Provide(mockHttp.Object);

                var mockLogger = mock.Mock<ILogger>();
                mockLogger.Setup(x => x.Log(It.IsAny<string>()));
                mock.Provide(mockLogger.Object);

                mock.Provide<ILogic, Logic>();

                var context = MockStatelessServiceContextFactory.Default;
                var sut = mock.Create<Backend.Backend>(
                    new NamedParameter("context", context)
                );

                var values = await sut.GetValues(1);
                values.Length.ShouldBe(4);
                values[0].ShouldBe("a");
                values[1].ShouldBe("b");
                values[2].ShouldBe("c");
                values[3].ShouldBe("d");

                mockHttp.Verify(m => m.GetResponse(1), Times.Once);
                mockHttp.Verify(m => m.GetResponse(2), Times.Never);

                mockLogger.Verify(m => m.Log(It.IsAny<string>()), Times.Exactly(2));
            }
        }

        [TestMethod]
        public void TestMethod2()
        {
            using (var mock = AutoMock.GetStrict())
            {
                var mockHttp = mock.Mock<IHttpCaller>();

                mockHttp.Setup(m => m.Compute(
                    It.Is<Request>(r =>
                    r.Name == "Pippo" &&
                    r.Surname == "Pluto" &&
                    r.Addresses.Count == 1 &&
                    r.Addresses[0].Number == 1 &&
                    r.Addresses[0].Street == "della prova"
                    )
                ))
                .Returns(() =>
                {
                    return new Response
                    {
                        FullName = "Pluto Pippo",
                        Addresses = new List<Address>
                        {
                            new Address
                            {
                                Street = "VIA della prova",
                                Number = 1
                            },
                            new Address
                            {
                                Street = "VIA della prova",
                                Number = 2
                            }
                        }
                    };
                })
                .Verifiable();

                mock.Provide(mockHttp.Object);

                var mockLogger = mock.Mock<ILogger>();
                mockLogger.Setup(x => x.Log(It.IsAny<string>()));
                mock.Provide(mockLogger.Object);

                mock.Provide<ILogic, Logic>();

                var context = MockStatelessServiceContextFactory.Default;
                var sut = mock.Create<Backend.Backend>(
                    new NamedParameter("context", context)
                );

                var response = sut.Compute(new Request
                {
                    Name = "Pippo",
                    Surname = "Pluto",
                    Addresses = new List<Address>
                    {
                        new Address
                        {
                            Number = 1,
                            Street = "della prova"
                        }
                    }
                });

                response.FullName.ShouldBe("Pluto Pippo");
                response.Addresses.Count.ShouldBe(2);

                response.Addresses[0].Number.ShouldBe(1);
                response.Addresses[0].Street.ShouldBe("VIA della prova");

                response.Addresses[1].Number.ShouldBe(2);
                response.Addresses[1].Street.ShouldBe("VIA della prova");
            }
        }

        private JObject BuildObject(string v)
        {
            return JObject.FromObject(new { title = v });
        }
    }
}
