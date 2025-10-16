export function isNumber(value) {
return value !== undefined && value !== null && value !== "" && !isNaN(Number(value));
}