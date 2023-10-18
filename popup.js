// When the DOM is ready, add an event listener for the "Highlight" button.
document.addEventListener("DOMContentLoaded", function () {
    const highlightButton = document.getElementById("highlightButton");
    highlightButton.addEventListener("click", highlightText);
  });
  
  // Function to highlight selected text with the chosen color.
  function highlightText() {
    const highlightColor = document.getElementById("highlightColor").value;
  
    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
  
      // Execute the highlighting script in the context of the active tab
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (color) => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.style.backgroundColor = color;
            range.surroundContents(span);
          }
        },
        args: [highlightColor],
      });
    });
  }
  
  
  
  