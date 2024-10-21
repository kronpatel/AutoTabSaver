// Function to save open tabs to Chrome storage
function saveTabs() {
    chrome.tabs.query({}, function(tabs) {
      let tabUrls = tabs.map(tab => tab.url);
      chrome.storage.local.set({savedTabs: tabUrls}, function() {
        console.log("Tabs saved successfully!", tabUrls);
      });
    });
  }
  
  // Function to restore tabs
  function restoreTabs() {
    chrome.storage.local.get("savedTabs", function(data) {
      if (data.savedTabs) {
        data.savedTabs.forEach(url => {
          chrome.tabs.create({url: url});
        });
      }
    });
  }
  
  // Listen for when Chrome is started
  chrome.runtime.onStartup.addListener(restoreTabs);
  
  // Save tabs when the extension is unloaded
  chrome.runtime.onSuspend.addListener(saveTabs);
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveTabs") {
      saveTabs();
      sendResponse({status: "Tabs saved"});
    } else if (request.action === "restoreTabs") {
      restoreTabs();
      sendResponse({status: "Tabs restored"});
    }
  });
  