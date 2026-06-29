
function updateClock() {

    const now = new Date();

    document.getElementById("date").innerHTML =
        now.toLocaleDateString();

    document.getElementById("time").innerHTML =
        now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock, 1000);


const generateBtn = document.getElementById("generate");
const prompt = document.getElementById("prompt");
const style = document.getElementById("style");



generateBtn.addEventListener("click", function () {
    if (prompt.value.trim() === "") {
        alert("Please enter an image prompt.");
        return;
    }

    generateBtn.innerHTML = "Generating...";
    generateBtn.disabled = true;

    // Reset UI for new generation
    document.getElementById("analysis").innerHTML = "Processing...";
    document.getElementById("sceneType").innerHTML = "Detecting...";
    document.getElementById("imageStyle").innerHTML = style.value;
    document.getElementById("lighting").innerHTML = "Analyzing...";
    document.getElementById("vramUsage").innerHTML = "Allocating...";

    // Update pipeline steps to reflect Z-Image-Turbo architecture
    document.getElementById("step1").innerHTML = "🟢 Prompt Received";
    document.getElementById("step2").innerHTML = "⚪ INT8 Quantization & Routing";
    document.getElementById("step3").innerHTML = "⚪ Running Warmup";
    document.getElementById("step4").innerHTML = "⚪ 8 DiT Forwards (Turbo Inference)";
    document.getElementById("step5").innerHTML = "⚪ Ready";

    // Step 2: Simulate INT8 Quantization & GPU Routing
    setTimeout(function () {
        document.getElementById("step2").innerHTML = "🟢 INT8 Quantization & Routing";
        document.getElementById("vramUsage").innerHTML = "Spiking...";
    }, 1000);

    // Step 3: Simulate the throwaway warmup generation
    setTimeout(function () {
        document.getElementById("step3").innerHTML = "🟢 Running Warmup";
    }, 2200);

    // Step 4: Simulate the actual inference loop (6 steps / 8 DiT forwards)
    setTimeout(function () {
        document.getElementById("step4").innerHTML = "🟢 8 DiT Forwards (Turbo Inference)";
    }, 3500);

    // Step 5: Final completion at exactly 5.3 seconds
    setTimeout(function () {
        document.getElementById("step5").innerHTML = "🟢 Ready";
        
        document.getElementById("analysis").innerHTML = "Completed";
        document.getElementById("sceneType").innerHTML = "Landscape";
        document.getElementById("lighting").innerHTML = "Cinematic";
        
        // Populate the exact metrics from your backend testing
        document.getElementById("timeEstimate").innerHTML = "5.300 sec";
        document.getElementById("vramUsage").innerHTML = "14.85 GB";

        generateBtn.innerHTML = "✨ Generate Image";
        generateBtn.disabled = false;
        
        // Optional: If you want to show a placeholder image at the end of the demo
        const previewBox = document.querySelector('.preview-box');
        previewBox.innerHTML = '<img src="images/mountains.jpeg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" alt="Generated Mountain">';

    }, 5300); // Set strictly to 5300ms to match the 5.3s latency
});
