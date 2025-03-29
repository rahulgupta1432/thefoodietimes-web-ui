// Right-click disable
document.addEventListener("contextmenu", (event) => event.preventDefault());

// F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U disable
document.addEventListener("keydown", (event) => {
    if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) ||
        (event.ctrlKey && event.key === "U")
    ) {
        event.preventDefault();
        showDangerAlert();
    }
});

// Function to show a danger alert
function showDangerAlert() {
    const alertBox = document.createElement("div");
    alertBox.innerHTML = "🚨 Warning: Unauthorized Access Detected! 🚨";
    alertBox.style.position = "fixed";
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.background = "red";
    alertBox.style.color = "white";
    alertBox.style.padding = "20px";
    alertBox.style.fontSize = "20px";
    alertBox.style.fontWeight = "bold";
    alertBox.style.borderRadius = "10px";
    alertBox.style.boxShadow = "0px 0px 10px black";
    alertBox.style.zIndex = "9999";
    document.body.appendChild(alertBox);

    setTimeout(() => {
        // window.location.href = "about:blank"; // Website se hata de
        window.location.href = "/not_found.html"; // Website se hata de

    }, 2000);
}

// Detect DevTools Open
(function () {
    const threshold = 160;

    const detectDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (widthThreshold || heightThreshold) {
            showDangerAlert();
        }
    };

    setInterval(detectDevTools, 1000);
})();
