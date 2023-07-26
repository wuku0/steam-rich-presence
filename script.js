async function scrapeSteamProfile() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const steamProfileURL = 'https://steamcommunity.com/id/sirwuku'; // Replace with the target Steam profile
  
    try {
      const response = await fetch(proxyURL + steamProfileURL);
      const html = await response.text();
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
  
      const xpath = '/html/body/div[1]/div[7]/div[6]/div[1]/div[2]/div/div[1]/div[1]/div/div[2]';
      const element = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  
      if (element) {
        const info = element.textContent;
        document.getElementById('result').textContent = info;
      } else {
        document.getElementById('result').textContent = 'Element not found.';
      }
    } catch (err) {
      console.error('Error:', err);
      document.getElementById('result').textContent = 'An error occurred. Please check the console.';
    }
  }
  
  // Automatically run script
  window.onload = scrapeSteamProfile;
  