const headers = [];
const rows = [];

let i = 1;
while (true) {
    try {
        const { results } = require(`./runs/run-${i}-fields.json`);
        rows.push(results.map(result => result.mean));

        if (!headers.length) {
            headers.push(...results.map(result => result.command.split('/').pop()));
        }

        i++;
    } catch (e) {
        break;
    }
}

process.stdout.write(headers.join(',') + '\n');
rows.forEach(row => process.stdout.write(row.join(',') + '\n'));
