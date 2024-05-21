const fs = require('fs');

function parseJson(json) {
    if (typeof json != "string") {
        throw new Error('Input is not a string');
    }

    let index = 0;

    json = json.replace(/\s/g, ""); // remove all whitespaces

    parseValue();

    function parseValue() {
        const char = json[index];

        if (char === '{') {
            return parseObject();
        } else if (char === '[') {
            return parseArray();
        } else if (char === '"') {
            return parseString();
        } else if (char === 't') {
            return parseTrue();
        } else if (char === 'f') {
            return parseFalse();
        } else if (char === 'n') {
            return parseNull();
        } else if (char === '-' || (char >= '0' && char <= '9')) {
            return parseNumber();
        } else {
            throw new Error('Invalid JSON');
        }
    }

    function parseObject() {
        let obj = {};
        index++;

        if (json[index] === '}') {
            index++;
            return obj;
        }

        while (index < json.length) {
            const key = parseString();
            if (json[index] !== ':') {
                throw new Error('Invalid JSON');
            }
            index++;
            const value = parseValue();
            obj[key] = value;

            if (json[index] === '}') {
                index++;
                return obj;
            } else if (json[index] !== ',') {
                throw new Error('Invalid JSON');
            }

            index++;
        }

        throw new Error('Invalid JSON');
    }

    function parseArray() {
        let arr = [];
        index++;

        if (json[index] === ']') {
            index++;
            return arr;
        }

        while (index < json.length) {
            arr.push(parseValue());
            if (json[index] === ']') {
                index++;
                return arr;
            }
            if (json[index] === ',') {
                index++;
            } else {
                console.log("JSON:", json[index]);
                throw new Error('Invalid JSON');
            }
        }

        throw new Error('Invalid JSON');
    }

    function parseString() {
        let str = '';
        index++;

        while (index < json.length) {
            const char = json[index];
            if (char === '"') {
                index++;
                return str;
            } else if (char === '\\') {
                index++;
                const escapedChar = json[index];
                switch (escapedChar) {
                    case '"':
                        str += '"';
                        break;
                    case '\\':
                        str += '\\';
                        break;
                    case '/':
                        str += '/';
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'u':
                        const hexCode = json.substr(index + 1, 4);
                        str += String.fromCharCode(parseInt(hexCode, 16));
                        index += 4;
                        break;
                    default:
                        throw new Error('Invalid Escape Character');
                }
            } else {
                str += char;
            }
            index++;
        }

        throw new Error('Invalid JSON');
    }

    function parseTrue() {
        if (json.substr(index, 4) === 'true') {
            index += 4;
            return true;
        } else {
            throw new Error('Invalid JSON');
        }
    }

    function parseFalse() {
        if (json.substr(index, 5) === 'false') {
            index += 5;
            return false;
        } else {
            throw new Error('Invalid JSON');
        }
    }

    function parseNull() {
        if (json.substr(index, 4) === 'null') {
            index += 4;
            return null;
        } else {
            throw new Error('Invalid JSON');
        }
    }

    function parseNumber() {
        let numStr = '';
        let char = json[index];

        if (char === '-') {
            numStr += char;
            index++;
        }

        while (index < json.length) {
            char = json[index];
            if (char >= '0' && char <= '9') {
                numStr += char;
                index++;
            } else {
                break;
            }
        }

        return parseFloat(numStr);
    }

    return json;
}

function main() {
    const args = process.argv.slice(2);

    let json;
    if (args.length === 0) {
        console.error('No input provided. Please provide a JSON string or use the -f flag to specify a file.');
        process.exit(1);
    } else if (args[0] === '-f') {
        if (args.length < 2) {
            console.error('Please provide a filename after the -f flag.');
            process.exit(1);
        }

        const filename = args[1];
        try {
            json = fs.readFileSync(filename, 'utf8');
        } catch (err) {
            console.error(`Error reading file ${filename}: ${err.message}`);
            process.exit(1);
        }
    } else {
        json = args.join(' ');
    }

    console.log("JSON:", parseJson(json));
}

main();
