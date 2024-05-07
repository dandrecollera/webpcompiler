const fs = require("fs");
const sharp = require("sharp");

const inputFolder = "inputs";
const outputFolder = "output100";

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        if (file.endsWith(".png") || file.endsWith(".jpg")) {
            const inputPath = `${inputFolder}/${file}`;
            const outputPath = `${outputFolder}/${file.replace(/\.[^/.]+$/, "")}.webp`;

            sharp(inputPath)
                .webp({ quality: 100, alphaQuality: 100 })
                .toFile(outputPath)
                .then(() => console.log(`Converted ${file} to WebP`))
                .catch((err) => console.error(err));
        }
    });
});
