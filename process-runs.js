const fs = require('fs');

const headers = ['numFields'];
const rows = [];

let i = 1;
for (const file of fs.readdirSync(__dirname + '/runs')) {
    try {
        const field = file.split('-')[1];
        const { results } = require(`./runs/${file}`);
        rows.push([field, ...results.map(result => result.mean)]);

        if (headers.length === 1) {
            headers.push(...results.map(result => result.command.split('/').pop()));
        }

        i++;
    } catch (e) {
        break;
    }
}

rows.sort((a, b) => a[0] - b[0]);

process.stdout.write(headers.join(',') + '\n');
rows.forEach(row => process.stdout.write(row.join(',') + '\n'));
