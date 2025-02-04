function getTableData() {
  const rows = document.querySelectorAll("tr.main-tables-tr");
  const data = [];

  rows.forEach((row) => {
    const tds = Array.from(row.querySelectorAll("td.main-tables-td")).slice(
      0,
      4
    );
    data.push(tds.map((td) => td.textContent.trim()));
  });

  return data;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTableData") {
    sendResponse(getTableData());
  }
});
