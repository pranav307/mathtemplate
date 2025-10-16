// controllers/interestController.js


export function compoundInterest(req, res) {
try {
const { principal, rate, time, compounding = 1 } = req.body;


// Basic validation
if ([principal, rate, time].some((v) => v === undefined)) {
return res.status(400).json({ error: true, message: "principal, rate and time are required" });
}


const P = Number(principal);
const r = Number(rate) / 100;
const t = Number(time);
const n = Number(compounding) || 1; // times compounded per year


// Amount formula: A = P (1 + r/n)^(n t)
const base = 1 + r / n;
const exponent = n * t;
const amount = parseFloat((P * Math.pow(base, exponent)).toFixed(6));
const interest = parseFloat((amount - P).toFixed(6));


const steps = [];
steps.push(`Formula: A = P (1 + r/n)^{n t}`);
steps.push(`Substitute: P=${P}, r=${r} (decimal), n=${n}, t=${t}`);
steps.push(`Compute base = 1 + r/n = ${base}`);
steps.push(`Exponent = n * t = ${exponent}`);
steps.push(`A = ${P} * (${base})^${exponent} = ${amount}`);
steps.push(`Interest = A - P = ${interest}`);


res.json({ principal: P, rate: Number(rate), time: t, compounding: n, amount, interest, steps });
} catch (err) {
console.error(err);
res.status(500).json({ error: true, message: "Server error" });
}
}


export function simpleInterest(req, res) {
try {
const { principal, rate, time } = req.body;
if ([principal, rate, time].some((v) => v === undefined))
return res.status(400).json({ error: true, message: "principal, rate and time are required" });


const P = Number(principal);
const r = Number(rate);
const t = Number(time);


// Simple Interest: SI = (P * R * T) / 100
const si = parseFloat(((P * r * t) / 100).toFixed(6));
const amount = parseFloat((P + si).toFixed(6));


const steps = [];
steps.push(`Formula: SI = (P * R * T) / 100`);
steps.push(`Substitute: P=${P}, R=${r}%, T=${t}`);
steps.push(`SI = (${P} * ${r} * ${t}) / 100 = ${si}`);
steps.push(`Amount = P + SI = ${P} + ${si} = ${amount}`);


res.json({ principal: P, rate: r, time: t, simpleInterest: si, amount, steps });
}
 catch (err) {
console.error(err);
res.status(500).json({ error: true, message: "Server error" });
}
}