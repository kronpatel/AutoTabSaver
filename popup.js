document.getElementById("saveBtn").addEventListener("click", function() {
    chrome.runtime.sendMessage({action: "saveTabs"}, function(response) {
      console.log(response.status);
      alert(response.status);
    });
  });
  
  document.getElementById("restoreBtn").addEventListener("click", function() {
    chrome.runtime.sendMessage({action: "restoreTabs"}, function(response) {
      console.log(response.status);
      alert(response.status);
    });
  });
  