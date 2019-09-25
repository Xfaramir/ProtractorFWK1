import { browser, by, element } from "protractor";

browser.waitForAngularEnabled(false);

export class HomePage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css(".home-page-today__text")).getText() as Promise<
      string
    >;
  }

  displayTopScorecards() {
    return element
      .all(
        by.js(function() {
          return document.querySelectorAll(
            "article > div.MuiContainer-root.MuiBox-root.jss234.MuiContainer-maxWidthLg > div > div> div.jss236 > div.jss239.jss240"
          );
        })
      )
      .then(function(playersScorecard) {
        for (let i = 0; i < playersScorecard.length; i++) {
          if (i >= 0 && i < 5) {
            playersScorecard[i].click();
          }

          if (
            i >= playersScorecard.length / 2 &&
            i < playersScorecard.length / 2 + 5
          ) {
            playersScorecard[i].click();
          }

          if (i >= playersScorecard.length - 5 && i < playersScorecard.length) {
            playersScorecard[i].click();
          }
        }
      });
  }
  getWebTitle() {
    return browser.getTitle() as Promise<string>;
  }

  navigateToWeb(WebUrl) {
    return browser.get(WebUrl) as Promise<any>;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  convertUrlsExcel() {
    let xls_json = require("xls-to-json");

    xls_json(
      {
        input: __dirname + "/ListUrls.xls",
        output: __dirname + "/testUrls.json",
        sheet: "Sheet2"
      },
      function(err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      }
    );
  }
}
