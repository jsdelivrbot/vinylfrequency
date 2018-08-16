const fs = require("fs");
const PDFDocument = require("pdfkit");

pt = mm => mm / (25.4 / 72);

const cx = (deg, radius) => {
  return Math.cos((deg - 90) * (Math.PI / 180)) * radius;
};

const cy = (deg, radius) => {
  return Math.sin((deg - 90) * (Math.PI / 180)) * radius;
};

const w = 210;
const h = 297;

const doc = new PDFDocument({ size: [pt(w), pt(h)] });

doc.pipe(fs.createWriteStream("./paper/test.pdf"));

//doc.rect(0, 0, pt(210 - 10), pt(297 - 10)).fill("#6600FF");

doc.circle(pt(w / 2), pt(h / 2), pt(w / 2.1)).stroke('black')

const length = 9;

Array.from({ length }).forEach((_, index) => {

  doc
    .moveTo(pt(w / 2), pt(h / 2))
    .lineTo(
      pt(cx(360 / length * index, w / 2.1) + (w / 2)),
      pt(cy(360 / length * index, w / 2.1) + (h / 2)),
    )
    .lineWidth(pt(3))
    .stroke('#777')

  doc.circle(
    pt(cx(360 / length * index, w / 2.2 - (index * 2.5)) + (w / 2)),
    pt(cy(360 / length * index, w / 2.2 - (index * 2.5)) + (h / 2)),
    pt(5)
  )
    .fill("black");

});

doc.circle(pt(w / 2), pt(h / 2), pt(5)).lineWidth(pt(0.5)).fillAndStroke('white', 'black')

doc.end();
