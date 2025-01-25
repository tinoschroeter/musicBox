document.getElementById("postButton").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const videoUrl = tabs[0].url;

    if (!videoUrl.includes("youtube.com/watch")) {
      statusMessage.textContent =
        "Warning: You are not on a valid YouTube video page!";
      statusMessage.className = "error";
      return;
    }
    // URL where the YouTube URL should be posted
    const apiUrl = "https://musicbox.tino.sh/upload"; // Adapt

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: videoUrl }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Successfully posted", data);
        statusMessage.textContent = "The URL was successfully posted!";
        statusMessage.className = "success";
      })
      .catch((error) => {
        console.error("Error posting:", error);
        statusMessage.textContent = "There was an error posting the URL.";
        statusMessage.className = "error";
      });
  });
});
