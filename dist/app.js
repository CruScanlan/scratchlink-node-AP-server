"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const port = 3000;
let apIps;
const cacheDnsFileIps = () => {
    const file = fs_1.default.readFileSync(path_1.default.join(__dirname, '../examplednsfile.leases')).toString();
    apIps = [];
    const fileLines = file.split('\n');
    for (let fileLine of fileLines) {
        const fileLineParts = fileLine.split(' ');
        apIps.push({
            ip: fileLineParts[2],
            hostname: fileLineParts[3],
            mac: fileLineParts[4]
        });
    }
};
app.get('/', (req, res) => res.json({ data: apIps }));
app.listen(port, () => {
    console.log(`ScratchLink AP Server litsening at http://localhost:${port}`);
    setInterval(() => {
        cacheDnsFileIps();
    }, 500);
});
//# sourceMappingURL=app.js.map