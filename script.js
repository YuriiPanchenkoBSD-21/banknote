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
            
            // Generate downloadable image
            let imageURL = canvas.toDataURL("image/png");

            // Create a clickable image with a direct download link
            let outputImage = document.createElement("a");
            outputImage.href = imageURL;
            outputImage.download = "combined_banknote.png";

            let imgTag = document.createElement("img");
            imgTag.src = imageURL;
            imgTag.style.border = "1px solid #ddd";
            
            outputImage.appendChild(imgTag);
            outputImage.style.display = "block";

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
