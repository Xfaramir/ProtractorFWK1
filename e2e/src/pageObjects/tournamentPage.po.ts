import { browser, by, element } from "protractor";
import { HomePage } from "./homePage.po";

browser.waitForAngularEnabled(false);

export class TournamentPage extends HomePage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
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
}
