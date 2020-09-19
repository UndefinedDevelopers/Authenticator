function generateImage() {
    const { createCanvas, registerFont } = require("canvas");
    registerFont("fonts/PressStart2P.ttf", { family: "Press Start" });
    const canvas = createCanvas(100, 35);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF8C00";
    ctx.font = '15px "Press Start"';
    ctx.fillText(`${code}`, 12, 35);

    return canvas;
}
exports.generateImage = generateImage;