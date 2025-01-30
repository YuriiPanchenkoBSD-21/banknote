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
            let width = Math.max(frontImg.width, backImg.width);
            let height = frontImg.height + backImg.height;
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(frontImg, 0, 0);
            ctx.drawImage(backImg, 0, frontImg.height);
            
            // Enable download
            let downloadLink = document.getElementById('downloadLink');
            downloadLink.href = canvas.toDataURL("image/png");
            downloadLink.style.display = "inline-block";
        }
    }

    frontImg.onload = imageLoaded;
    backImg.onload = imageLoaded;

    frontImg.src = URL.createObjectURL(frontFile);
    backImg.src = URL.createObjectURL(backFile);
});
