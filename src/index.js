"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const pathfinder_class_1 = require("./classes/pathfinder.class");
const program = new commander_1.Command();
program.option('-f, --file <path>', 'file path').parse(process.argv);
const options = program.opts();
if (!options.file) {
    console.error('Error: You must specify a file using the -f or --file option.');
    process.exit(1);
}
try {
    const content = fs.readFileSync(options.file, { encoding: 'utf8' });
    const contentMatrix = content.split('\n').map((str) => str.split(''));
    const finalPath = new pathfinder_class_1.Pathfinder(contentMatrix);
    const result = finalPath.findPath();
    console.log(`Letters: ${result.letters} \nPath: ${result.path}`);
}
catch (error) {
    console.error(error);
    process.exit(1);
}
