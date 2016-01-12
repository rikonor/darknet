var testS3 = function() {
  // TODO: Implement an S3 connectivity test
  return true;
};

var testMongoDB = function() {
  return Episodes.findOne() !== undefined;
};

var testApp = function() {
  var errs = [];
  var appValid = true;

  if (! testS3()) {
    appValid = false;
    errs.push("S3 failed health check.");
  }

  if (! testMongoDB()) {
    appValid = false;
    errs.push("MongoDB failed health check.");
  }

  var res = {
    "health": appValid ? "OK" : "ERROR",
  };

  if (! appValid) {
    res.errors = errs;
  }

  return res;
};

JsonRoutes.add("get", "/health", function (req, res, next) {
  var appHealth = testApp();
  var appHealthStatusCode = appHealth.health === "OK" ? 200 : 500;
  JsonRoutes.sendResult(res, appHealthStatusCode, appHealth);
});
