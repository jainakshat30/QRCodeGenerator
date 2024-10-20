let qrText = document.getElementById("qrText");
let qrImage = document.getElementById("qrImage");
let imgBox = document.getElementById("imgBox");
let qrSize = document.getElementById("qrSize");
let qrHistory = document.getElementById("qrHistory");
let isDark = true;
let body = document.body;
let themeToggle = document.getElementById("themeToggle");
let errorMessage = document.getElementById("errorMessage");

function qrgenerate() {
    if (qrText.value.trim() === "") {
        qrText.classList.add("empty");
        errorMessage.style.display = "block";
        setTimeout(() => {
            qrText.classList.remove("empty");
        }, 300);
    } else {
        errorMessage.style.display = "none";
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=" + qrSize.value + "&data=" + encodeURIComponent(qrText.value);

        imgBox.classList.remove("show");
        setTimeout(() => {
            imgBox.classList.add("show");

            // Add QR code to history
            let newQR = document.createElement('li');
            newQR.innerHTML = `<a href="${qrImage.src}" target="_blank">${qrText.value}</a>`;
            if (qrHistory.childNodes.length >= 5) {
                qrHistory.removeChild(qrHistory.childNodes[0]);
            }
            qrHistory.appendChild(newQR);
        }, 10);
    }
}

function downloadQR() {
    if (qrImage.src && qrText.value.trim() !== "") {
        const link = document.createElement('a');
        link.href = qrImage.src;
        link.download = 'qrcode.png';
        link.click();
    }
}

themeToggle.onclick = function() {
    if (isDark) {
        body.style.backgroundColor = "#fff";
        body.style.color = "#000";
        isDark = false;
    } else {
        body.style.backgroundColor = "#262a2f";
        body.style.color = "#fff";
        isDark = true;
    }
}
