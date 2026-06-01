namespace Test_WWD;

[TestClass]
public sealed class Test1
{
    [TestMethod]
    private static Mock<IDataSource<object>> Provider(
        string id, object data, bool valid = true)
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
    public async Task CacheHit_NemHivjaAProvidert_HaFrissAdatVanCacheban()
    {
        var entry = new CacheEntry { ProviderId = "w", Data = "{}", UpdatedAt = DateTime.UtcNow };
        var manager = new DashboardManager(new InMemoryCacheRepository(entry));
        var provider = CreateProvider("w", new { });
        manager.RegisterProvider(provider.Object);
 
        await manager.FetchByProviderIdAsync("w");
 
        provider.Verify(p => p.FetchDataAsync(), Times.Never);
    }
 
    
}