function parseJson(json) {
    if (typeof json != "string") {
        throw new Error('Input is not a string');
    }

    let index = 0;

    function stripWhitespace() {
        json.trimStart();
        index = 0;
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
       // } else if (char === 't') {
       //     return parseTrue();
       // } else if (char === 'f') {
       //     return parseFalse();
       // } else if (char === 'n') {
       //     return parseNull();
        if (char === '-' || (char >= '0' && char <= '9')) {
            return parseNumber();
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
const jsonData1 = parseJson('30 ');
console.log("JSON:", jsonData1);
