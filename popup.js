const txt = document.querySelector(".txt");
const user = "mickey2025";
const userHostName = "www.spidymanual.com";
function copyToClipboard(socialtype) {
  const textToCopy = `${userHostName}/${user}/${socialtype}`;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      txt.innerHTML = `copied!...${user}/${socialtype}`;
    })
    .catch((err) => {
      txt.innerHTML = "Error!..while copying link";
    });
}

document.querySelector(".currentSite").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);

  const hostname = url.hostname.replace(/^(https?:\/\/)?(www\.)?/, "");
  const domainName = hostname.split(".")[0];
  const textToCopy = `${userHostName}/${user}/${
    domainName === "newtab" ? "" : domainName
  }`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      domainName === "newtab"
        ? (txt.innerHTML = "Hey! its a empty tab.Copied url ")
        : (txt.innerHTML = `copied!...${user}/${domainName}`);
    })
    .catch((err) => {
      txt.innerHTML = "Error!..while copying link";
    });
});
document
  .querySelector(".fb")
  .addEventListener("click", () => copyToClipboard("facebook"));
document
  .querySelector(".linkedin")
  .addEventListener("click", () => copyToClipboard("linkedin"));
