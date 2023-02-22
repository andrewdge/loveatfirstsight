const density = '情钟见一';
let video;

function setup() {
    let canvas = createCanvas(720, 450);
    video = createCapture(VIDEO);
    video.size(72,45);
    video.hide(); // hide actual video
    button = createButton('save');
    button.position(674, 506);
    button.mousePressed(keyPressed);
}

function draw() {
    background(255);
    let w = width / video.width; // width is canvas width
    let h = width / video.height; // use width for both to preserve aspect ratio
    video.loadPixels(); // loads pixels into video.pixels[] to be manipulated

    for (let y = 0; y < video.height; y++) {
        for (let x = 0; x < video.width; x++) {
            // formatted as rgba, in one huge 1d array.
            // normally to access pixelIndex, use (x + y * width) * 4, but it is reversed so we take
            // width - x, not sure what + 1 does yet
            const pixelIndex = (video.width - x + 1 + (y * video.width)) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            // const a = video.pixels[pixelIndex + 3];
            const avg = (r + g + b) / 3;
            // noStroke();
            fill(avg); // i think this acts as alpha but it's all 0's?

            // map from 0-255 to character density
            const charIndex = floor(map(avg, 0, 255, 0, density.length));
            
            textAlign(CENTER,CENTER);
            // i think x * w, y * h works
            text(density.charAt(charIndex), x * w + w * 0.5, y * h + h * 0.5);
        }
    }
}

function keyPressed() {
    // this will download the frame
    saveCanvas('一见钟情', 'jpg');
  
}