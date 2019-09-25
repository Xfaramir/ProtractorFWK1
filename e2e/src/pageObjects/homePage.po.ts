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

  imageHasdisplayed() {
    return element(
      by.js(function() {
        return document.querySelector(
          "div.MuiBox-root.jss363.jss350 > div > div > div:nth-child(2) > a > div > img"
        );
      })
    );
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
