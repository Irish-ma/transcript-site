// Automatically grabs the current HTML filename and parses data
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("transcriptContainer");

  try {
    const rawHtml = await fetch(window.location.href).then(res => res.text());

    // Attempt to parse and extract messages
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    const rawMessages = Array.from(doc.body.querySelectorAll("p"));
    if (rawMessages.length === 0) throw new Error("No messages found.");

    container.innerHTML = ""; // Clear loader

    rawMessages.forEach(p => {
      const [userPart, ...messageParts] = p.textContent.split(":");
      const username = userPart.trim();
      const message = messageParts.join(":").trim();

      const messageDiv = document.createElement("div");
      messageDiv.className = "message";

      const avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7289da&color=fff`;

      const content = document.createElement("div");
      content.className = "message-content";

      const name = document.createElement("div");
      name.className = "username";
      name.textContent = username;

      const msg = document.createElement("div");
      msg.className = "content";
      msg.textContent = message;

      content.appendChild(name);
      content.appendChild(msg);

      messageDiv.appendChild(avatar);
      messageDiv.appendChild(content);
      container.appendChild(messageDiv);
    });
  } catch (err) {
    console.error(err);
    container.textContent = "Failed to load transcript.";
  }
});
