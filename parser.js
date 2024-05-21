function parseJson(json) {
    if (typeof json != "string") {
        throw new Error('Input is not a string');
    }

    let index = 0;

    function stripWhitespace() {
        while (index < json.length) {
            const char = json[index];
            if (char === ' ' || char === '\n' || char === '\t' || char === '\r')
                index++;
            else
                break;
        }
    }

    parseValue();

    // im gonna write a recursive descent parser here
    function parseValue() {
        stripWhitespace();
        const char = json[index];

       // if (char === '{') {
       //     return parseObject();
       // } else if (char === '[') {
       //     return parseArray();
       // } else if (char === '"') {
       //     return parseString();
        if (char === 't') {
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

//const jsonData1 = parseJson('{ "name": "John", "age": 30 }');
const jsonData1 = parseJson('     true  ');
console.log("JSON:", jsonData1);
