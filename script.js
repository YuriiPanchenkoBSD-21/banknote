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
            let height = Math.max(frontImg.height, backImg.height); // Use max height
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(frontImg, 0, 0); // Draw front image on the left
            ctx.drawImage(backImg, frontImg.width, 0); // Draw back image on the right
            
            // Convert canvas to an image
            let imageURL = canvas.toDataURL("image/png");

            // Create an <img> tag to display the merged image
            let outputImage = document.createElement("img");
            outputImage.src = imageURL;
            outputImage.style.border = "1px solid #ddd";
            outputImage.style.cursor = "pointer"; // Make it look clickable

            // Clear previous images and add new one
            let outputSection = document.querySelector(".output-section");
            outputSection.innerHTML = "";
            outputSection.appendChild(outputImage);

            // Allow right-click saving
            outputImage.addEventListener("contextmenu", function (e) {
                e.preventDefault(); // Prevent default menu issues
            });

            // Optional: Provide a direct download link
            let downloadLink = document.createElement("a");
            downloadLink.href = imageURL;
            downloadLink.download = "combined_banknote.png";
            downloadLink.textContent = "Download Image";
            downloadLink.style.display = "block";
            downloadLink.style.marginTop = "10px";
            outputSection.appendChild(downloadLink);
        }
    }

    frontImg.onload = imageLoaded;
    backImg.onload = imageLoaded;

    frontImg.src = URL.createObjectURL(frontFile);
    backImg.src = URL.createObjectURL(backFile);
});
