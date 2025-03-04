chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "addToAnki",
        title: "Seçili Kelimeyi Anki'ye Ekle",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "addToAnki") {
        let selectedText = info.selectionText;
        if (selectedText) {
            addToAnki(selectedText);
        }
    }
});

function addToAnki(word) {
    fetch("http://localhost:8765", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "action": "addNote",
            "version": 6,
            "params": {
                "note": {
                    "deckName": "Default",
                    "modelName": "Basic",
                    "fields": {
                        "Front": word,
                        "Back": "Otomatik eklendi."
                    },
                    "tags": ["web"]
                }
            }
        })
    }).then(response => response.json())
      .then(data => console.log("Anki'ye eklendi:", data))
      .catch(error => console.error("Hata:", error));
}
