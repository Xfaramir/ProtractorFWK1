// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
var screenShotUtils = require("protractor-screenshot-utils")
  .ProtractorScreenShotUtils;

exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./src/**/*.e2e-spec.ts"],
  multiCapabilities: [
    {
      browserName: "chrome",

      chromeOptions: {
        args: ["--window-size=1300,800"]
      }
    }
  ],
  directConnect: false,
  seleniumAddress: "http://localhost:4444/wd/hub",
  framework: "jasmine2",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.e2e.json")
    });

    global.screenShotUtils = new screenShotUtils({
      browserInstance: browser,
      setAsDefaultScreenshotMethod: true
    });

    // //Creating Allure report from jasmine results

    const AllureReporter = require("jasmine-allure-reporter");
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "./allure-results"
      })
    );
    //Taking a screenshot at the end of each spec for jenkins allure report
    jasmine.getEnv().afterEach(function(done) {
      browser.takeScreenshot().then(function(png) {
        allure.createAttachment(
          "Screenshot",
          function() {
            return new Buffer(png, "base64");
          },
          "image/png"
        )();
        allure.addEnvironment("QA", "Jose Barrera");
        allure.severity("Normal");
        done();
      });
    });
  }
};
