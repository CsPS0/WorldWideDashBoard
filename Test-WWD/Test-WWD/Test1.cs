namespace Test_WWD;

[TestClass]
public class Test1
{
    [TestMethod]
    private static Mock<IDataSource<object>> CreateProvider(string id, object data, bool valid = true)
    {
        var m = new Mock<IDataSource<object>>();
        m.Setup(p => p.Id).Returns(id);
        m.Setup(p => p.Name).Returns(id);
        m.Setup(p => p.Category).Returns("test");
        m.Setup(p => p.GetCacheKey()).Returns(id);
        m.Setup(p => p.FetchDataAsync()).ReturnsAsync(data);
        m.Setup(p => p.ValidateResponse(It.IsAny<object>())).Returns(valid);
        return m;
    }
    
    [TestMethod]
    public async Task FrissAdatBetoltes_MindenProviderMegjelenik_HaCacheUres()
    {
        var manager = new DashboardManager(new InMemoryCacheRepository());
        var pA = CreateProvider("widget-a", new { Value = 1 });
        var pB = CreateProvider("widget-b", new { Value = 2 });
        manager.RegisterProvider(pA.Object);
        manager.RegisterProvider(pB.Object);
        var results = await manager.FetchAllDataAsync();
        Assert.IsTrue(results.ContainsKey("widget-a"));
        Assert.IsTrue(results.ContainsKey("widget-b"));
        pA.Verify(p => p.FetchDataAsync(), Times.Once);
        pB.Verify(p => p.FetchDataAsync(), Times.Once);
    }
    
    [TestMethod]
    public async Task CacheHit_NemHivjaAProvidert_HaFrissAdatVanCacheban()
    {
        var entry = new CacheEntry { ProviderId = "w", Data = "{}", UpdatedAt = DateTime.UtcNow };
        var manager = new DashboardManager(new InMemoryCacheRepository(entry));
        var provider = CreateProvider("w", new { });
        manager.RegisterProvider(provider.Object);
        await manager.FetchByProviderIdAsync("w");
        provider.Verify(p => p.FetchDataAsync(), Times.Never);
    }
    
    [TestMethod]
    public async Task ErvenytelenAdat_Visszaesik_RegiCacheAdatra_HaValidacioMeghiusul()
    {
        var stale = new CacheEntry { ProviderId = "w", Data = "{\"v\":1}", UpdatedAt = DateTime.UtcNow.AddHours(-2) };
        var manager = new DashboardManager(new InMemoryCacheRepository(stale));
        manager.RegisterProvider(CreateProvider("w", new { v = 99 }, valid: false).Object);
        var result = await manager.FetchByProviderIdAsync("w");
        Assert.IsNotNull(result);
        Assert.AreEqual(1, ((System.Text.Json.JsonElement)result).GetProperty("v").GetInt32());
    }
}