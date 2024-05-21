const fs = require('fs');

const parser = require('./parser.cjs')

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

    console.log("JSON:", parser(json));
}

main();
