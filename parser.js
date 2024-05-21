console.log('Parsing JSON');
var json = process.argv[2];

console.log(typeof json != "string");
if (typeof json != "string") {
    throw new Error('Input is not a string');
}

json = json.trim();

try {
    return JSON.parse(json);
} catch (e) {
    throw new Error('Invalid JSON');
}
