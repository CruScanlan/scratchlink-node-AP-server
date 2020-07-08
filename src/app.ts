import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

interface IAPIp {
    ip: string;
    hostname: string;
    mac: string;
}

let apIps: IAPIp[];

const cacheDnsFileIps = () => {
    const file = fs.readFileSync(path.join(__dirname, '../examplednsfile.leases')).toString();
    
    apIps = [];

    const fileLines = file.split('\n');
    for(let fileLine of fileLines) {
        const fileLineParts = fileLine.split(' ');

        apIps.push({
            ip: fileLineParts[2],
            hostname: fileLineParts[3],
            mac: fileLineParts[4]
        });
    }
}

app.get('/', (req, res) => res.json({data: apIps}));

app.listen(port, () => {
    console.log(`ScratchLink AP Server litsening at http://localhost:${port}`)

    setInterval(() => {
        cacheDnsFileIps()
    }, 500)
})

