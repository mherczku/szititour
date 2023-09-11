const fs = require("fs");
const path = require("path");

const dir = "frontend/src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const content = `${process.env.ENV_STAGE}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if(err) {
        // Dir not exist
        console.log("src not exist, creating now", process.cwd());
        fs.mkdir(dir, {recursive: true}, (err) => {
            if(err) throw err;
        });
    }

    // Write content to file
    try {
        fs.writeFileSync(dir + "/" + file, content);
        fs.writeFileSync(dir + "/" + prodFile, content);
        console.log("Write successfull in", process.cwd());

        if(fs.existsSync(dir + "/" + file)) {
            console.log("File created", path.resolve(dir + "/" + file));
        }
        if(fs.existsSync(dir + "/" + prodFile)) {
            console.log("File created", path.resolve(dir + "/" + file + content));
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});