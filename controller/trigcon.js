

export function pythagorean(req, res) {
try {
const { a, b, find = "c" } = req.body; // find can be 'c' or 'a' or 'b'


if (find === "c") {
if (a === undefined || b === undefined)
return res.status(400).json({ error: true, message: "a and b required to find c" });


const A = Number(a);
const B = Number(b);
const c2 = A * A + B * B;
const C = parseFloat(Math.sqrt(c2).toFixed(6));


const steps = [];
steps.push("Using Pythagoras: c^2 = a^2 + b^2");
steps.push(`a^2 = ${A}^2 = ${A * A}`);
steps.push(`b^2 = ${B}^2 = ${B * B}`);
steps.push(`c^2 = ${A * A} + ${B * B} = ${c2}`);
steps.push(`c = sqrt(${c2}) = ${C}`);


return res.json({ a: A, b: B, c: C, steps });
}


// if they want to find a or b given other sides
if (find === "a") {
const { b: B, c: C } = req.body;
if (B === undefined || C === undefined)
return res.status(400).json({ error: true, message: "b and c required to find a" });
const bNum = Number(B);
const cNum = Number(C);
const a2 = cNum * cNum - bNum * bNum;
if (a2 < 0) return res.status(400).json({ error: true, message: "invalid sides" });
const A = parseFloat(Math.sqrt(a2).toFixed(6));
const steps = [
"Using Pythagoras: c^2 = a^2 + b^2",
`c^2 = ${cNum}^2 = ${cNum * cNum}`,
`b^2 = ${bNum}^2 = ${bNum * bNum}`,
`a^2 = c^2 - b^2 = ${cNum * cNum} - ${bNum * bNum} = ${a2}`,
`a = sqrt(${a2}) = ${A}`,
];
return res.json({ a: A, b: bNum, c: cNum, steps });
}


if (find === "b") {
const { a: A, c: C } = req.body;
if (A === undefined || C === undefined)
return res.status(400).json({ error: true, message: "a and c required to find b" });
const aNum = Number(A);
const cNum = Number(C);
const b2 = cNum * cNum - aNum * aNum;
if (b2 < 0) return res.status(400).json({ error: true, message: "invalid sides" });
const B = parseFloat(Math.sqrt(b2).toFixed(6));
const steps = [
"Using Pythagoras: c^2 = a^2 + b^2",
`c^2 = ${cNum}^2 = ${cNum * cNum}`,
`a^2 = ${aNum}^2 = ${aNum * aNum}`,
`b^2 = c^2 - a^2 = ${cNum * cNum} - ${aNum * aNum} = ${b2}`,
`b = sqrt(${b2}) = ${B}`,
];
return res.json({ a: aNum, b: B, c: cNum, steps });
}


return res.status(400).json({ error: true, message: "invalid find parameter" });
} catch (err) {
console.error(err);
res.status(500).json({ error: true, message: "Server error" });
}
}


export function sineFromOppHyp(req, res) {
try {
const { opposite, hypotenuse } = req.body;
if (opposite === undefined || hypotenuse === undefined)
return res.status(400).json({ error: true, message: "opposite and hypotenuse required" });


const o = Number(opposite);
const h = Number(hypotenuse);
if (h === 0) return res.status(400).json({ error: true, message: "hypotenuse cannot be zero" });


const sine = parseFloat((o / h).toFixed(6));
const angleRad = Math.asin(Math.min(1, Math.max(-1, o / h)));
const angleDeg = parseFloat((angleRad * (180 / Math.PI)).toFixed(6));


const steps = [
`sin(θ) = opposite / hypotenuse = ${o} / ${h} = ${sine}`,
`θ = arcsin(${sine}) = ${angleDeg}°`,
];


res.json({ opposite: o, hypotenuse: h, sine, angleDeg, steps });
} catch (err) {
console.error(err);
res.status(500).json({ error: true, message: "Server error" });
}
}


export function cosineFromAdjHyp(req, res) {
try {
const { adjacent, hypotenuse } = req.body;
if (adjacent === undefined || hypotenuse === undefined)
return res.status(400).json({ error: true, message: "adjacent and hypotenuse required" });


const a = Number(adjacent);
const h = Number(hypotenuse);
if (h === 0) return res.status(400).json({ error: true, message: "hypotenuse cannot be zero" });


const cosine = parseFloat((a / h).toFixed(6));
const angleRad = Math.acos(Math.min(1, Math.max(-1, a / h)));
const angleDeg = parseFloat((angleRad * (180 / Math.PI)).toFixed(6));


const steps = [
`cos(θ) = adjacent / hypotenuse = ${a} / ${h} = ${cosine}`,
`θ = arccos(${cosine}) = ${angleDeg}°`,
];


res.json({ adjacent: a, hypotenuse: h, cosine, angleDeg, steps });
} catch (err) {
console.error(err);
res.status(500).json({ error: true, message: "Server error" });
}
}