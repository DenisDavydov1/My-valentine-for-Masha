let video;
let asciiDiv;
const W = 80 * 2;
const H = 50 * 2;
const fills = [
  // 'люблю-тебя-больше,чем-пиццу.',
  // 'самая-милая-на-всем-свете.',
  '.Машенька',
  '.я+ты=навсегда',
  '.я-влюблен,обожаю,люблю',
  '.иду-вперед-ради-тебя',
  '.хрупкая,но-сильная',
  '.Маша,я-тебя-люблю',
  '.ценю,люблю,обнимаю',
  '.булочка',
  '.скучаю',
  '.лучшая',
  '.красивая',
  '.я-рядом',
  '.чудесная',
  '.люблю',
  '.добрая',
];

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(W,H);
  video.hide();
  asciiDiv = createDiv('');
}

function draw() {
  // const txt = '       .:-i|=+%O#@';
  const txt = '      .теаябЛЮМ';
  background(0);
  video.loadPixels();
  textFont('courier');
  let output = [];
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let index = (W - i + j * W) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
      let bindex = map(bright, 0, 255, 0, txt.length);
      let ch = txt.charAt(floor(bindex));
      if (ch == ' ') {
        output.push('&nbsp;');
      } else {
        output.push(ch);
      }
    }
    output.push('<br/>');
  }

  
  for (let i = 0; i < output.length; ) {
    if (output[i] == '&nbsp;') {
      i++;
      continue;
    }

    let j = i;
    while (output[j] === output[i]) {
      j++;
    }
    if (j - i > 10) {
      let start = i + 2;
      let end = j - 2;
      fills.forEach(fill => {
        if (fill.length <= end - start) {
          for (let k = 0; k < fill.length; k++) {
            output[start++] = fill[k];
          }
        }
      });
      
    }
    i = j;
  }
  
  asciiDiv.html(output.join(''));
}