
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayScorecards() {
  let playersScorecard = document.querySelectorAll(
    "article > div.MuiContainer-root.MuiBox-root.jss234.MuiContainer-maxWidthLg > div > div> div.jss236 > div.jss239.jss240"
  );

  for (let i = 0; i < playersScorecard.length; i++) {
    if (i >= 0 && i < 5) {
      playersScorecard[i].click();
      console.log(playersScorecard[i].innerText);
    }

    if (
      i >= playersScorecard.length / 2 &&
      i < playersScorecard.length / 2 + 5
    ) {
      playersScorecard[i].click();
      console.log(playersScorecard[i].innerText);
    }

    if (i >= playersScorecard.length - 5 && i < playersScorecard.length) {
      playersScorecard[i].click();
    }
  }

  await sleep(3000);
  console.log("Ended");
}

displayScorecards();
