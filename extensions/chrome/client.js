console.log('Page load', window.location.host)

// IDs 
var toggleId = 'open-ui-toggle';
var cssId = 'open-ui-styles';
var host = window.location.host;

// Listen to event when extension is disabled/enabled
chrome.storage.onChanged.addListener(function (data) {
  var enabled = data.enabled;
  var isEnabled = enabled.newValue;

  // Unload content if no longer enabled
  if (isEnabled) {
    init();
  } else {
    destroy();
  }
});

// Read the extension settings to determine if AW should be injected
chrome.storage.sync.get("enabled", function (value) {
  var enabled = value.enabled;
  
  if (enabled) init();
});

function init() {
  console.log('initing', host)
  // Boot up overlay UI
  // Create a floating tab to toggle the AW
  if (!document.getElementById(cssId)) {
    var body = document.getElementsByTagName('body')[0];
    var toggle = document.createElement('div');
    toggle.id = toggleId;
    body.append(toggle)
  }

  // Try to inject the CSS for the domain
  if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdn.jsdelivr.net/gh/fathomcompany/decentralized-presentation-layer/css/'+host+'.css';
    link.media = 'all';
    link.onerror = function (e) {
      console.log('This site has not been augmented. Start designing here: ')
    };
    head.appendChild(link);
  }
}


// Unload all scripts if the extension is turned off
function destroy() {
  console.log('destroying')

  // Pull the injected domain-specific CSS
  var styleLink = document.getElementById(cssId);
  if (styleLink) {
    styleLink.disabled = true;
    styleLink.remove();
  }

  // Remove the AW UI
  var toggle = document.getElementById(toggleId);
  if (toggle) {
    toggle.remove();
  }
}