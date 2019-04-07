const { createCanvas, loadImage } = require('canvas');
const fs = require('fs-extra');

class AvatarGenerator {
  constructor() {
    this.canvas = createCanvas(180, 180);
    this.ctx = this.canvas.getContext('2d');
    this.assetsPath = `${__dirname}/bottt/`;
    this.folderName = '/avatars/';
    fs.ensureDirSync(`${__dirname}/../..${this.folderName}`);
  }

  static red(sf) {
    return (sf.split('').reduce((a, v) => a + parseInt(v, 10), 0) % 4) + 1;
  }

  static guid(seed) {
    const i = seed.split('').map(s => s.charCodeAt(0)).join('');
    const ii = seed.split('').reverse().map(s => s.charCodeAt(0)).join('');
    let f = `${i}${ii}`;
    f = `${i}${f.length}${ii}`;
    const s = f.length / 5;
    return [
      AvatarGenerator.red(f.substring(0, s)),
      AvatarGenerator.red(f.substring(s, s * 2)),
      AvatarGenerator.red(f.substring(s * 2, s * 3)),
      AvatarGenerator.red(f.substring(s * 3, s * 4)),
      AvatarGenerator.red(f.substring(s * 4)),
    ];
  }

  async generate(seed) {
    const outPath = `${this.folderName}${seed}.png`;
    const exist = await fs.pathExists(`${__dirname}/../..${outPath}`);
    if (exist) {
      return outPath;
    }

    const index = AvatarGenerator.guid(seed);
    const side = await loadImage(`${this.assetsPath}1-side/${index[0]}.png`);
    this.ctx.drawImage(side, 0, 0);

    const top = await loadImage(`${this.assetsPath}2-top/${index[1]}.png`);
    this.ctx.drawImage(top, 0, 0);

    const face = await loadImage(`${this.assetsPath}3-face/${index[2]}.png`);
    this.ctx.drawImage(face, 0, 0);

    const mouth = await loadImage(`${this.assetsPath}4-mouth/${index[3]}.png`);
    this.ctx.drawImage(mouth, 0, 0);

    const eyes = await loadImage(`${this.assetsPath}5-eyes/${index[4]}.png`);
    this.ctx.drawImage(eyes, 0, 0);

    // Image transformation
    // const imageData = this.ctx.getImageData(0, 0, 180, 180);
    // for (let i = 0; i < imageData.data.length; i += 4) {
    //   imageData.data[i] = 255 - imageData.data[i]; // rouge
    //   imageData.data[i + 1] = 255 - imageData.data[i + 1]; // vert
    //   imageData.data[i + 2] = 255 - imageData.data[i + 2]; // bleu
    // }
    // this.ctx.putImageData(imageData, 0, 0);

    await fs.writeFile(`${__dirname}/../..${outPath}`, this.canvas.toBuffer());
    return outPath;
  }
}

module.exports = AvatarGenerator;
