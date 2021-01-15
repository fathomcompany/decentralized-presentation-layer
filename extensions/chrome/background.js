console.log('welcome to a new world');

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({enabled: true}, function() {
    console.log("Initting AW enabled to true");
    toggleBadgeText(true);
  });
});

chrome.browserAction.onClicked.addListener(function () {
  
  // Get the value, the nset the opposite (effectively a toggle)
  chrome.storage.sync.get("enabled", function(value) {
    var isOn = !value.enabled
    chrome.storage.sync.set({ enabled: isOn });

    toggleBadgeText(isOn)
  });
});

//Toggle the badge text to indicate the plugin is on 
function toggleBadgeText (isOn) {
  // Update the icone text so the user can tell if hte extension is running
    if (isOn) {
      chrome.browserAction.setBadgeText({text: '!!'});
    } else {
      chrome.browserAction.setBadgeText({text: '' });
    }
}