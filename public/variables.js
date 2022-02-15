class Random {
    constructor(f) {
        (this.seed = f), (this.originalSeed = f);
    }
    randDec() {
        return (this.seed ^= this.seed << 13), (this.seed ^= this.seed >> 17), (this.seed ^= this.seed << 5), ((this.seed < 0 ? 1 + ~this.seed : this.seed) % 1e3) / 1e3;
    }
    randNum(f, z) {
        return f + (z - f) * this.randDec();
    }
    randInt(f, z) {
        return Math.floor(this.randNum(f, z + 1));
    }
    reset() {
        this.seed = this.originalSeed;
    }
}
var sww = 700,
    shh = 840;
let canvas;
const st_deviation = 50,
    layers = 80;
var left_x, right_x, top_y, bottom_y, resolution, num_columns, num_rows, grid, offset;
let img,
    easing = 0.05;
var imgList = [image1+image12, image2+image22+image23, image3+image32+image33, image4+image42, image5+image52];
const num_steps = 200,
    step_length = 5;
let angoff = 0,
    shapecolors = [],
    pentagons = [],
    x1 = [],
    y1 = [],
    x2 = [],
    y2 = [];
var pp = [
    [300, -300],
    [300, -100],
    [300, 100],
    [300, 300],
    [300, 500],
];
let tokenData = { hash: random_hash(), tokenId: "123000456" };
const defaultSize = 1e3,
    ratio = 0.83;
let hh = shh,
    ww = sww,
    dim = Math.min(ww, hh),
    M = dim / 1e3;
console.log(`M: ${M}`), console.log(`Hash: ${tokenData.hash}`);
const seed = parseInt(tokenData.hash.slice(0, 16), 16);
console.log(`Seed: ${seed}`);
const R = new Random(seed);
function random_hash() {
    let f = "0123456789abcdef",
        z = "0x";
    for (let P = 64; P > 0; --P) z += f[Math.floor(Math.random() * f.length)];
    return z;
}
