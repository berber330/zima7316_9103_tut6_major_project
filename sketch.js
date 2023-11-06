// Set global variables
let canvasWidth = 1000;
let canvasHeight = 1000;
let yellowRects = [];
let blueRects = [];
let redRects = [];
let grayRects = [];
let extraYellowRects = [];
// Divide the 1000 * 1000 pixel canvas into 2500 small squares of 20 * 20 pixels
let pixelLength = 20;
let yellowRegions = [];
let song;
let fft;
let aa = 255;
let isInit = false;
let offset = 0;
let speed = 0
let playButton;

// Set a fixed class for rectangles of different colours and sizes
// This distinction can facilitate subsequent animations and endow them with unique functions
class yellowRect{
  constructor(x, y, width, height, rotation){
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? canvasWidth;
    this.height = height ?? canvasHeight;
    this.rotation = rotation ?? 0;
  }

  draw(){
    push();
    translate(this.x,this.y);
    rotate(this.rotation);

    noStroke();
    fill(250, 201, 1);
    rect(0, 0, this.width, this.height);

    pop();
  }
}

class blueRect{
  constructor(x, y, width, height, rotation, move){
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? canvasWidth;
    this.height = height ?? canvasHeight;
    this.rotation = rotation ?? 0;
// Select a random shake direction for the rectangle
    this.d = int(random(4)) + 1;
    this.dd = int(random(4)) + 1;
// Indicates whether the rectangle will move
    this.move = move; 
  }

  draw(){
    push();

// Shake by direction
    if (this.d == 1) {
      translate(this.x + offset, this.y);
    } else if (this.d == 2) {
      translate(this.x - offset, this.y);
    } else if (this.d == 3) {
      translate(this.x, this.y - offset);
    } else if (this.d == 4) {
      translate(this.x, this.y + offset);
    }

    rotate(this.rotation);

    noStroke();
    fill(34, 80, 149, aa);// Add transparency
    rect(0, 0, this.width, this.height);

    pop();

    if (this.move) {
      if (checkNext(this.dd, { x: this.x, y: this.y }, speed)) {
// Move according to direction
        if (this.dd == 1) {
          // up
          this.y = this.y - speed;
        } else if (this.dd == 2) {
          // right
          this.x = this.x + speed;
        } else if (this.dd == 3) {
          // down
          this.y = this.y + speed;
        } else if (this.dd == 4) {
          // left
          this.x = this.x - speed;
        }
      } else {
        this.dd = int(random(4)) + 1;
      }
    }
  }
}

// Determine if the next position is inside the yellow rectangle
function checkNext(dd, pos, speed) {
  if (dd == 1) {
    // up
    let col = get(pos.x, pos.y - speed);
    return col[0] === 250 && col[1] === 201 && col[2] === 1;
  } else if (dd == 2) {
    // right
    let col = get(pos.x + pixelLength + speed, pos.y);
    return col[0] === 250 && col[1] === 201 && col[2] === 1;
  } else if (dd == 3) {
    // down
    let col = get(pos.x, pos.y + pixelLength + speed);
    return col[0] === 250 && col[1] === 201 && col[2] === 1;
  } else if (dd == 4) {
    // left
    let col = get(pos.x - speed, pos.y);
    return col[0] === 250 && col[1] === 201 && col[2] === 1;
  }
}

class redRect{
  constructor(x, y, width, height, rotation, move){
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? canvasWidth;
    this.height = height ?? canvasHeight;
    this.rotation = rotation ?? 0;
// Select a random shake direction for the rectangle
    this.d = int(random(4)) + 1;
    this.dd = int(random(4)) + 1;
// Indicates whether the rectangle will move
    this.move = move;
  }

  draw(){
    push();
// Shake by direction
     if (this.d == 1) {
      translate(this.x + offset, this.y);
    } else if (this.d == 2) {
      translate(this.x - offset, this.y);
    } else if (this.d == 3) {
      translate(this.x, this.y - offset);
    } else if (this.d == 4) {
      translate(this.x, this.y + offset);
    }
    rotate(this.rotation);

    noStroke();
    fill(221, 1, 0, aa);// Add transparency
    rect(0, 0, this.width, this.height);

    pop();

    if (this.move) {
      if (checkNext(this.dd, { x: this.x, y: this.y }, speed)) {
// Move according to direction
        if (this.dd == 1) {
          // up
          this.y = this.y - speed;
        } else if (this.dd == 2) {
          // right
          this.x = this.x + speed;
        } else if (this.dd == 3) {
          // down
          this.y = this.y + speed;
        } else if (this.dd == 4) {
          // left
          this.x = this.x - speed;
        }
      } else {
        this.dd = int(random(4)) + 1;
      }
    }
  }
}

class grayRect{
  constructor(x, y, width, height, rotation, move){
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? canvasWidth;
    this.height = height ?? canvasHeight;
    this.rotation = rotation ?? 0;
// Select a random shake direction for the rectangle
    this.d = int(random(4)) + 1;
    this.dd = int(random(4)) + 1;
// Indicates whether the rectangle will move
    this.move = move;
  }

  draw(){
    push();
// Shake by direction
    if (this.d == 1) {
      translate(this.x + offset, this.y);
    } else if (this.d == 2) {
      translate(this.x - offset, this.y);
    } else if (this.d == 3) {
      translate(this.x, this.y - offset);
    } else if (this.d == 4) {
      translate(this.x, this.y + offset);
    }
    rotate(this.rotation);

    noStroke();
    fill(200, aa);// Add transparency
    rect(0, 0, this.width, this.height);

    pop();

    if (this.move) {
      if (checkNext(this.dd, { x: this.x, y: this.y }, speed)) {
// Move according to direction
        if (this.dd == 1) {
          // up
          this.y = this.y - speed;
        } else if (this.dd == 2) {
          // right
          this.x = this.x + speed;
        } else if (this.dd == 3) {
          // down
          this.y = this.y + speed;
        } else if (this.dd == 4) {
          // left
          this.x = this.x - speed;
        }
      } else {
        this.dd = int(random(4)) + 1;
      }
    }
  }
}

// Add audio
function preload() {
  song = loadSound("audio/Dizzy_Gillespie_Trinidad_Hello.mp3");
}

// Store rectangles of different colours and types in the array
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  yellowRects.push(new yellowRect(0, 20, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 140, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 320, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 380, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 500, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 560, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 620, 60, pixelLength));
  yellowRects.push(new yellowRect(60, 660, 460, pixelLength));
  yellowRects.push(new yellowRect(0, 700, 60, pixelLength));
  yellowRects.push(new yellowRect(0, 760, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 800, 60, pixelLength));
  yellowRects.push(new yellowRect(0, 860, 1000, pixelLength));
  yellowRects.push(new yellowRect(0, 960, 1000, pixelLength));

  yellowRects.push(new yellowRect(20, 0, pixelLength, 320));
  yellowRects.push(new yellowRect(60, 0, pixelLength, 1000));
  yellowRects.push(new yellowRect(120, 0, pixelLength, 860));
  yellowRects.push(new yellowRect(240, 0, pixelLength, 1000));
  yellowRects.push(new yellowRect(480, 0, pixelLength, 1000));
  yellowRects.push(new yellowRect(520, 0, pixelLength, 320));
  yellowRects.push(new yellowRect(520, 380, pixelLength, 620));
  yellowRects.push(new yellowRect(600, 380, pixelLength, 180));
  yellowRects.push(new yellowRect(800, 0, pixelLength, 1000));
  yellowRects.push(new yellowRect(860, 0, pixelLength, 320));
  yellowRects.push(new yellowRect(900, 0, pixelLength, 380));
  yellowRects.push(new yellowRect(900, 560, pixelLength, 220));
  yellowRects.push(new yellowRect(960, 0, pixelLength, 1000));

  extraYellowRects.push(new yellowRect(120, 60, 120, pixelLength*2));
  extraYellowRects.push(new yellowRect(120, 240, 120, pixelLength*3));
  extraYellowRects.push(new yellowRect(800, 420, 160, pixelLength*3));
  extraYellowRects.push(new yellowRect(800, 660, 160, pixelLength*2));
  extraYellowRects.push(new yellowRect(120, 700, 120, pixelLength*3));
  extraYellowRects.push(new yellowRect(160, 320, pixelLength*3, 80));
  extraYellowRects.push(new yellowRect(300, 380, pixelLength*3, 120));
  extraYellowRects.push(new yellowRect(400, 320, pixelLength*3, 200));

  blueRects.push(new blueRect(80, 180, pixelLength*3, 60));
  blueRects.push(new blueRect(80, 600, pixelLength*3, 60));
  blueRects.push(new blueRect(300, 420, pixelLength*3, 80));
  blueRects.push(new blueRect(600, 160, pixelLength*5, 160));
  blueRects.push(new blueRect(880, 100, pixelLength*4, 40));
  blueRects.push(new blueRect(820, 600, pixelLength*4, 60));

  redRects.push(new redRect(160, 40, pixelLength*3, 100));
  redRects.push(new redRect(140, 440, pixelLength*5, 60));
  redRects.push(new redRect(280, 40, pixelLength*4, 100));
  redRects.push(new redRect(400, 860, pixelLength*3, 140));
  redRects.push(new redRect(600, 200, pixelLength*5, 80));
  redRects.push(new redRect(860, 180, pixelLength*3, 60));
  redRects.push(new redRect(640, 400, pixelLength*5, 160));
  redRects.push(new redRect(880, 420, pixelLength, 60));
  redRects.push(new redRect(820, 700, pixelLength*4, 60));

  grayRects.push(new grayRect(160, 100, pixelLength*3, 20));
  grayRects.push(new grayRect(160, 260, pixelLength*3, 20));
  grayRects.push(new grayRect(180, 340, pixelLength, 40));
  grayRects.push(new grayRect(180, 720, pixelLength*2, 20));
  grayRects.push(new grayRect(300, 60, pixelLength*2, 40));
  grayRects.push(new grayRect(280, 120, pixelLength*4, 20));
  grayRects.push(new grayRect(400, 380, pixelLength*3, 20));
  grayRects.push(new grayRect(400, 420, pixelLength*3, 60));
  grayRects.push(new grayRect(400, 900, pixelLength*3, 60));
  grayRects.push(new grayRect(660, 420, pixelLength*3, 60));
  grayRects.push(new grayRect(640, 540, pixelLength*5, 20));

// Create FFT for audio visualization
  fft = new p5.FFT(0.3);

// Add a play music button and set the style
  playButton = createButton('Play music');
  playButton.position(80, 100);
  playButton.mousePressed(togglePlayback);
  playButton.style('width', '120px');
  playButton.style('height', '40px');
  playButton.style('font-size', '20px');
}

// Start drawing the previously set rectangle and draw all the rectangles in the array
function draw() {
  background(240);

// Determine whether the music is playing
// If it is playing, analyze the audio
  if (song.isPlaying()) {
  fft.analyze();
// Obtain audio data in the frequency range of 20 to 200 Hz (bass part)
  amp = fft.getEnergy(20, 200); 
// Convert the audio data from '100-200' to '0-255'
  aa = map(amp, 100, 200, 0, 255); 
// Obtain audio data in the frequency range of 200 to 2000 Hz (from mid-low to mid-high range part)
  amp = fft.getEnergy(200, 2000); 
// Convert the audio data from '100-150' to '0-10'
  offset = map(amp, 100, 150, 0, 10); 
// Obtain audio data in the frequency range of 2000 to 3000 Hz (treble part)
  amp = fft.getEnergy(2000, 3000); 
// Convert the audio data from '60-150' to '0.5-2'
  speed = map(amp, 60, 150, 0.5, 2);
  }

  yellowRects.forEach(r => r.draw());

// Generate the rectangle only once
if (!isInit) {
  detectYellowRegions();
  generateRandomRectangles();
  isInit = true;
}

  extraYellowRects.forEach(r => r.draw());
  blueRects.forEach(r => r.draw());
  redRects.forEach(r => r.draw());
  grayRects.forEach(r => r.draw());
}

// Identify all yellow ranges and store yellow pixels in the yellowRegions array
// Only identify the top left corner vertex of each pixel to ensure the position of each generated small rectangle is not offset and will be in the yellow rectangle
function detectYellowRegions() {
  loadPixels();
  for (let x = 0; x < canvasWidth; x += pixelLength) {
    for (let y = 0; y < canvasHeight; y += pixelLength) {
      let col = get(x, y);
      if (col[0] === 250 && col[1] === 201 && col[2] === 1) {
        yellowRegions.push({ x, y });
      }
    }
  }
  updatePixels();
}

// Randomly generate small rectangles with colors of "#225095", "#dd0100", and "#c8c8c8" from the yellowRegions range
// The number of small rectangles is equal to 300
function generateRandomRectangles() {
  let colors = ["#225095","#dd0100","#c8c8c8"];

  for (let i = 0; i < 300; i++) {
    let region = random(yellowRegions);
    let colorIndex = floor(random(colors.length));

    noStroke();
// Create corresponding rectangles based on colour
    if (colorIndex == 0) {
      grayRects.push(
        new grayRect(region.x, region.y, pixelLength, pixelLength, 0, true)
      );
    } else if (colorIndex == 1) {
      redRects.push(new redRect(region.x, region.y, pixelLength, pixelLength, 0, true)
      );
    } else if (colorIndex == 2) {
      blueRects.push(
        new blueRect(region.x, region.y, pixelLength, pixelLength, 0, true)
      );
    }
  }
}

function togglePlayback() {
  if (song.isPlaying()) {
      song.pause();
      playButton.html('Play music');
  } else {
      song.play();
      playButton.html('Pause play');
  }
}