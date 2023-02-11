let video;
let asciiDiv;
const fills = [
  // 'люблю-тебя-больше,чем-пиццу.',
  // 'самая-милая-на-всем-свете.',
  '.Машенька',
  '.я+ты=навсегда',
  '.я-влюблен,обожаю,люблю',
  // '.иду-вперед-ради-тебя',
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
const VW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const VH = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
console.log(VW, VH);
// const W = 160;
// const H = 100;
const W = Math.floor(VW / 15);
const H = W / 1.6;
console.log(W, H);


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
      output.push([ch, r, g, b]);
      // output.push([`<span style="color:rgb(${r},${g},${b});">`, ch == ' ' ? '&nbsp;' : ch, '</span>']);
      // output.push(`<span style="color:rgb(${r},${g},${b});">${ch == ' ' ? '&nbsp;' : ch}</span>`);
    }
    output.push(['<br/>']);
  }

  
  for (let i = 0; i < output.length; ) {
    if (output[i][0] === '<br/>' || output[i][0] == ' ') {
      i++;
      continue;
    }

    let j = i;
    while (output[j][0] === output[i][0]) {
      j++;
    }
    if (j - i > 10) {
      let start = i + 2;
      let end = j - 2;
      fills.forEach(fill => {
        if (fill.length <= end - start) {
          for (let k = 0; k < fill.length; k++) {
            output[start++][0] = fill[k];
          }
        }
      });
    }
    i = j;
  }

  var html = output.map(x => {
    switch (x[0]) {
      case '<br/>':
        return '<br/>';
      case ' ':
        return '&nbsp';
      default:
        return `<span style="color:rgb(${x[1]},${x[2]},${x[3]});">${x[0]}</span>`;
    }
  }).join('');
  
  asciiDiv.html(html);
}