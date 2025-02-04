document.getElementById("open-links").addEventListener("click", () => {
  const Tablerows = document.querySelectorAll(".main-tables-tr");
  const allLinks = [];

  Tablerows.forEach((row) => {
    const firstFourTDs = Array.from(row.querySelectorAll("td")).slice(0, 4);
    const values = firstFourTDs.map((td) => td.textContent.trim());
    const urlRegex = /https?:.+/g;

    values.forEach((value) => {
      const matches = value.match(urlRegex);
      if (matches) {
        allLinks.push(...matches);
      }
    });
  });

  allLinks.forEach((url) => {
    chrome.tabs.create({ url });
  });
});
