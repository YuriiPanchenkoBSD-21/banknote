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
            
            // Convert canvas to an actual image
            let outputImage = document.createElement("img");
            outputImage.src = canvas.toDataURL("image/png");
            outputImage.style.border = "1px solid #ddd"; // Optional styling
            
            let outputSection = document.querySelector(".output-section");
            outputSection.innerHTML = ""; // Clear previous images
            outputSection.appendChild(outputImage);

            // Ensure users can right-click to save
            outputImage.setAttribute("draggable", "false");
            outputImage.addEventListener("contextmenu", function (e) {
                e.preventDefault(); // Prevent context menu issues
            });
        }
    }

    frontImg.onload = imageLoaded;
    backImg.onload = imageLoaded;

    frontImg.src = URL.createObjectURL(frontFile);
    backImg.src = URL.createObjectURL(backFile);
});
