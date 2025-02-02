const txt = document.querySelector(".txt");

const userHostName = "www.spidymanual.com";
let userName;
async function getUsername() {
  const { username } = await chrome.storage.sync.get("username");
  if (username) return username;

  const userName = prompt("Enter your username:Eg(lara2025)");
  if (!userName) return null;

  await chrome.storage.sync.set({ username: userName });
  return userName;
}

(async function setUserName() {
  userName = await getUsername();
})();

function copyToClipboard(socialtype) {
  if (!userName) return;
  const textToCopy = `${userHostName}/${userName}/${socialtype}`;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      txt.innerHTML = `\u{1F389}copied!...${userName}/${socialtype}`;
    })
    .catch((err) => {
      txt.innerHTML = "Error!..while copying link";
    });
}

document.querySelector(".currentSite").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);

  if (!userName) return;
  const hostname = url.hostname.replace(/^(https?:\/\/)?(www\.)?/, "");
  const domainName = hostname.split(".")[0];
  const textToCopy = `${userHostName}/${userName}/${
    domainName === "newtab" ? "" : domainName
  }`;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      domainName === "newtab"
        ? (txt.innerHTML = "Hey! its a empty tab.Copied url ")
        : (txt.innerHTML = `\u{1F389}copied!...${userName}/${domainName}`);
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
