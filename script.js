import { encode, decode } from "/moo/moo.js";

function convertToMoo() {
    const inputText = document.getElementById("inputText").value;
    const encodedText = encode(inputText);
    document.getElementById("outputText").value = encodedText;
}

function convertFromMoo() {
    const inputText = document.getElementById("inputText").value;
    try {
        const decodedText = decode(inputText);
        document.getElementById("outputText").value = decodedText;
    } catch (error) {
        alert("The input isn't in the Meadow Optimized Orthography format!");
    }
}

function downloadMoo() {
    const mooText = document.getElementById("outputText").value;
    const blob = new Blob([mooText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.moo";
    link.click();
}

function readMooFile(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("inputText").value = e.target.result;
        };
        reader.readAsText(file);
    }
}

function swapText() {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const temp = inputText.value;
    inputText.value = outputText.value;
    outputText.value = temp;
}

window.convertToMoo = convertToMoo;
window.convertFromMoo = convertFromMoo;
window.downloadMoo = downloadMoo;
window.readMooFile = readMooFile;
window.swapText = swapText;
