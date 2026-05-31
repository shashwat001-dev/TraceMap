alert("NEW TRACKER FILE");

function generateSessionId() {
  return (
    "session_" +
    Date.now() +
    "_" +
    Math.random().toString(36).substring(2, 9)
  );
}

let sessionId = localStorage.getItem("tracemap_session");

if (!sessionId) {
  sessionId = generateSessionId();
  localStorage.setItem("tracemap_session", sessionId);
}

console.log("Tracker Loaded");
console.log("Session ID:", sessionId);



// CLICK TRACKING

document.addEventListener("click", async (event) => {

  const data = {
    sessionId: sessionId,
    eventType: "click",
    x: event.clientX,
    y: event.clientY,
    scrollY: window.scrollY,
    page: window.location.pathname,
    timestamp: Date.now(),
  };

  try {

    const response = await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("Click Sent:", result);

  } catch (error) {
    console.log("Click Error:", error);
  }

});



// MOUSE MOVE TRACKING

let lastMove = 0;

document.addEventListener("mousemove", async (event) => {

  const now = Date.now();

  // throttle
  if (now - lastMove < 500) return;

  lastMove = now;

  const data = {
    sessionId: sessionId,
    eventType: "mousemove",
    x: event.clientX,
    y: event.clientY,
    scrollY: window.scrollY,
    page: window.location.pathname,
    timestamp: now,
  };

  console.log("Mouse Detected");

  try {

    const response = await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    console.log("Mouse Move Sent:", result);

  } catch (error) {
    console.log("Mouse Error:", error);
  }

});

let lastScroll = 0;

window.addEventListener("scroll", async () => {

  const now = Date.now();

  if (now - lastScroll < 300) return;

  lastScroll = now;

  const data = {
    sessionId: sessionId,
    eventType: "scroll",
    scrollY: window.scrollY,
    page: window.location.pathname,
    timestamp: now,
  };

  try {

    await fetch("http://localhost:5000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Scroll Sent", data);

  } catch (error) {

    console.log(error);

  }

});

async function captureSessionScreenshot() {

  try {

    const canvas =
      await html2canvas(document.body);

    const blob =
      await new Promise(resolve =>
        canvas.toBlob(resolve)
      );

    const formData =
      new FormData();

    formData.append(
      "image",
      blob,
      "session.png"
    );

    formData.append(
      "sessionId",
      sessionId
    );

    await fetch(
      "http://localhost:5000/screenshot",
      {
        method: "POST",
        body: formData
      }
    );

    console.log(
      "Screenshot Uploaded"
    );

  } catch (error) {

    console.log(error);

  }

}

window.addEventListener(
  "beforeunload",
  () => {

    captureSessionScreenshot();

  }
);


window.testScreenshot =
  captureSessionScreenshot;