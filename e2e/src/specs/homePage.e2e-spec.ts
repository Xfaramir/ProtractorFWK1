import { HomePage } from "../pageObjects/homePage.po";

import { browser, logging } from "protractor";

const json = require("../pageObjects/testingUrls/testUrls.json");

let web: HomePage;

for (const site of json) {
  if (site.name === "Home") {
    describe(`PG ${site.name}`, function() {
      beforeEach(() => {
        web = new HomePage();
      });
      site.pages.forEach(page => {
        if (page.Run == "Yes") {
          it(`${page.Locale} / ${page.Page}`, function() {
            browser.manage().deleteAllCookies();
            web.navigateToWeb(page.URL);

            var elem = web.imageHasdisplayed();
            expect(elem.isDisplayed()).toBeTruthy();
            console.log(page.URL);
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

            /*
            expect(logs).not.toContain(
              jasmine.objectContaining({
                level: logging.Level.SEVERE
              } as logging.Entry)
            ); 
            */
          });
        }
      });
    });
  }
}
