document.getElementById('combineButton').addEventListener('click', function () {
    let frontFile = document.getElementById('frontImage').files[0];
    let backFile = document.getElementById('backImage').files[0];

    if (!frontFile || !backFile) {
        alert("Please upload both front and back images.");
        return;
    }

    let frontImg = new Image();
    let backImg = new Image();
    let canvas = document.getElementById('outputCanvas');
    let ctx = canvas.getContext('2d');

    let imagesLoaded = 0;

    function imageLoaded() {
        imagesLoaded++;
        if (imagesLoaded === 2) {
            let width = frontImg.width + backImg.width;  // Combine width
            let height = Math.max(frontImg.height, backImg.height); // Take max height
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(frontImg, 0, 0); // Draw front image on the left
            ctx.drawImage(backImg, frontImg.width, 0); // Draw back image on the right
            
            // Convert to image for right-click saving
            let outputImage = document.createElement("img");
            outputImage.src = canvas.toDataURL("image/png");
            outputImage.style.border = "1px solid #ddd"; // Optional styling
            
            let outputSection = document.querySelector(".output-section");
            outputSection.innerHTML = ""; // Clear previous images
            outputSection.appendChild(outputImage);
        }
    }

    frontImg.onload = imageLoaded;
    backImg.onload = imageLoaded;

    frontImg.src = URL.createObjectURL(frontFile);
    backImg.src = URL.createObjectURL(backFile);
});
