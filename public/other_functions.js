function createStretchedPentagon(a, e) {
    return [
        createVector(910 + randomGaussian(0, a) + e, 320 + e),
        createVector(830.9188309203678 + randomGaussian(0, a) + e, 510.9188309203678 + e),
        createVector(640 + randomGaussian(0, a) + e, 590 + e),
        createVector(449.0811690796322 + randomGaussian(0, a) + e, 510.91883092036784 + e),
        createVector(370 + randomGaussian(0, a) + e, 320.00000000000006 + e),
        createVector(449.0811690796321 + randomGaussian(0, a) + e, 129.0811690796322 + e),
        createVector(640 + randomGaussian(0, a) + e, 50 + e),
        createVector(830.9188309203678 + randomGaussian(0, a) + e, 129.08116907963213 + e),
    ];
}
function myFlowField(a, e, t) {
    for (var n = 0; n < t; n++) {
        var r = a - left_x,
            o = e - top_y,
            s = Math.round(r / resolution),
            i = Math.round(o / resolution);
        s >= num_columns && (s = num_columns - 1), i >= num_rows && (i = num_rows - 1);
        var u = grid[s][i],
            c = Math.abs(step_length * cos(u)),
            l = Math.abs(step_length * sin(u));
        ellipse(a, e, 30 * c, 30 * l), (a += c), (e += l);
    }
}
function drawCustomShape(a, e) {
    for (let t = 0; t < layers; t += 1) {
        let t = polygon(a, 1);
        fill(e), beginShape();
        for (let a of t) vertex(a.x, a.y);
        let n = getXmax(t),
            r = getYmax(t);
        for (let a = 0; a < 100; a += 1) {
            let a = random(0, n),
                e = random(0, r),
                t = 1e3 * Math.abs(randomGaussian(n, 0.03) - randomGaussian(n, 0.02));
            ellipse(a, e, t, t);
        }
        endShape(CLOSE);
    }
}
function getXmax(a) {
    let e = a[0].x;
    for (let t = 0; t < a.length; t += 1) e < a[t].x && (e = a[t].x);
    return e;
}
function getYmax(a) {
    let e = a[0].y;
    for (let t = 0; t < a.length; t += 1) e < a[t].y && (e = a[t].y);
    return e;
}
function polygon(a, e) {
    if (e >= 7) return a;
    {
        const t = [];
        for (let e in a) {
            t.push(a[e]);
            let n = int(e) + 1;
            try {
                const r = createVector((a[n].x + a[e].x) / 2, (a[n].y + a[e].y) / 2),
                    o = randomGaussian(0, st_deviation),
                    s = randomGaussian(0, st_deviation);
                r.add(o, s), t.push(r);
            } catch (n) {
                const r = createVector((a[0].x + a[e].x) / 2, (a[0].y + a[e].y) / 2),
                    o = randomGaussian(0, st_deviation),
                    s = randomGaussian(0, st_deviation);
                r.add(o, s), t.push(r);
            }
        }
        return polygon(t, e + 1);
    }
}
