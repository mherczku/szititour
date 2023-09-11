const fs = require("fs");
const path = require("path");

const dir = "frontend/src/environments";
const file = "environment.ts";
const prodFile = "environment.prod.ts";

const FIREBASE_CONFIG = `${process.env.FIREBASE_CONFIG}`;
const GOOGLE_ID = `${process.env.GOOGLE_ID}`;
const MAP_KEY = `${process.env.MAP_KEY}`;
const VPKEY = `${process.env.VPKEY}`;

fs.access(dir, fs.constants.F_OK, (err) => {
    if (err) {
        // Dir not exist
        console.log("src not exist, creating now", process.cwd());
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    // Write content to file
    try {
        fs.readFile(dir + "/" + prodFile, 'utf-8', function (err, contents) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            console.log("contents: " + contents);

            let replaced = contents.replace("SECRET_MAP_KEY", MAP_KEY);
            replaced = contents.replace("SECRET_GOOGLE_ID", GOOGLE_ID);
            replaced = contents.replace("SECRET_FIREBASE_CONFIG", FIREBASE_CONFIG);
            replaced = contents.replace("SECRET_VPKEY", VPKEY);

            console.log("replaced: " + replaced);

            fs.writeFileSync(dir + "/" + file, replaced);
            fs.writeFileSync(dir + "/" + prodFile, replaced + "//TEST SZÖVEG BELEMEGY E");
            console.log("Write successfull in", process.cwd());

            if (fs.existsSync(dir + "/" + file)) {
                console.log("File created", path.resolve(dir + "/" + file));
            }
            if (fs.existsSync(dir + "/" + prodFile)) {
                console.log("File created", path.resolve(dir + "/" + prodFile));
                const str = fs.readFileSync(dir + "/" + prodFile).toString();
                console.log(str);
            }


        });

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
});