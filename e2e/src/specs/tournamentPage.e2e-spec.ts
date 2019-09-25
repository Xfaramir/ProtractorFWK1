import { TournamentPage } from "../pageObjects/tournamentPage.po";

import { browser, logging } from "protractor";

const json = require("../pageObjects/testingUrls/testUrls.json");

let web: TournamentPage;

for (const site of json) {
  if (site.name === "Tournaments") {
    describe(`PG ${site.name}`, function() {
      beforeEach(() => {
        web = new TournamentPage();
      });
      site.pages.forEach(page => {
        if (page.Run === true) {
          it(`Truncated LDB ${page.Locale} / ${page.Page}`, function() {
            console.log(page.EventUrl);
            browser.manage().deleteAllCookies();
            web.navigateToWeb(page.EventUrl);
          });

          it(`${page.Locale} / ${page.Page}`, function() {
            console.log(page.LeaderboardUrl);
            browser.manage().deleteAllCookies();
            web.navigateToWeb(page.LeaderboardUrl);
            web.displayTopScorecards();
            browser.sleep(5000);
          });

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
