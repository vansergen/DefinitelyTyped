// The following tests are largely taken straight from the examples
// at https://docs.newrelic.com/docs/browser/new-relic-browser/browser-agent-spa-api

// --- NewRelic.Browser methods ----------------------------------------------

// addRelease()
newrelic.addRelease("checkout page", "a818994");

// addPageAction()
newrelic.addPageAction("copy-text-button", { result: "success" });
newrelic.addPageAction("async-action", { duration: 3000 });

// addToTrace()
newrelic.addToTrace({
    name: "Event Name",
    start: 1417044274239,
    end: 1417044274252,
    origin: "Origin of event",
    type: "What type of event was this",
});
newrelic.addToTrace({
    name: "Event Name",
    start: 1417044274239,
});

// finished()
newrelic.finished();

// noticeError()
try {
    JSON.parse("{ \"bar\"");
} catch (err) {
    newrelic.noticeError(err);
}
newrelic.noticeError(new Error("bar"));
newrelic.noticeError("bar");
newrelic.noticeError("bar", { foo: "bar", baz: 1 });

// setCustomAttribute()
newrelic.setCustomAttribute("nodeId", "123");
newrelic.setCustomAttribute("nodeId", 123);
newrelic.setCustomAttribute("nodeId", 123, true);

// setErrorHandler()
newrelic.setErrorHandler(err => {
    if (err.message !== "foo") {
        return true;
    } else {
        return false;
    }
});

// setPageViewName()
newrelic.setPageViewName("/login", "https://www.myapp.com");

// setCurrentRouteName()
newrelic.setCurrentRouteName("/users/:id");
newrelic.setCurrentRouteName(null);

// setUserId()
newrelic.setUserId("123");
newrelic.setUserId(null);

// --- NewRelic.BrowserInteraction methods -----------------------------------

// actionText()
newrelic.interaction().actionText("Create Subscription");

// createTracer()
newrelic.interaction().createTracer("customSegment", () => {})();

// end()
newrelic.interaction().end();

interface ProductContext {
    productId: number;
}
// getContext(), setAttribute()
const interaction = newrelic.interaction();
interaction.getContext<ProductContext>(ctx => {
    if (ctx.productId) {
        interaction.setAttribute("productId", ctx.productId);
    }
});
interaction.getContext((ctx: ProductContext) => {
    if (ctx.productId) {
        interaction.setAttribute("productId", ctx.productId);
    }
});

interaction.getContext(ctx => {
    if (ctx.productId) {
        interaction.setAttribute("productId", ctx.productId);
    }
});

interface MyAppContext {
    totalChartLoadTime: number;
    chartLoadCount: number;
}

// ignore()
newrelic.interaction().ignore();

// onEnd(), setAttribute()
newrelic.interaction().onEnd((ctx: MyAppContext) => {
    interaction.setAttribute("averageChartLoadTime", ctx.totalChartLoadTime / ctx.chartLoadCount);
});

newrelic.interaction().onEnd<MyAppContext>(ctx => {
    interaction.setAttribute("averageChartLoadTime", ctx.totalChartLoadTime / ctx.chartLoadCount);
});

// setName(), setAttribute(), save()
newrelic.interaction().setName("loadNextPage").setAttribute("username", "userName").setAttribute("userId", 123).save();
newrelic.interaction().setName("createSubscription");
