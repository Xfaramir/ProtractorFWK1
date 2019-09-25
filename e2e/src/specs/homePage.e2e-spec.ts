import { HomePage } from "../pageObjects/homePage.po";

import {
  browser,
  logging,
  element,
  by,
  By,
  $,
  $$,
  ExpectedConditions,
  protractor
} from "protractor";

const json = require("../pageObjects/testingUrls/testUrls.json");

let web: HomePage;

for (const site of json) {
  if (site.pages) {
    describe(`PG ${site.name}`, function() {
      beforeEach(() => {
        web = new HomePage();
        // Eyes need to be re open for each 'it' function in order to obtain difference between each run.
        //  eyes.open(browser, eyeView.appName, eyeView.testName);
      });
      site.pages.forEach(page => {
        if (page.Run == "Yes") {
          it(`${page.Locale} / ${page.Page}`, function() {
            console.log(page.URL);
            browser.manage().deleteAllCookies();
            web.navigateToWeb(page.URL);
            web.displayTopScorecards();
            browser.sleep(5000);
          });

          // it(`${page.Locale} / ${page.Page}`, function() {
          //   console.log(page.URL);
          //   browser.manage().deleteAllCookies();
          //   web.navigateToWeb(page.URL);
          // });

          afterEach(async () => {
            // Assert that there are no errors emitted from the browser
            const logs = await browser
              .manage()
              .logs()
              .get(logging.Type.BROWSER);
          });
        }
      });
    });
  }
}
