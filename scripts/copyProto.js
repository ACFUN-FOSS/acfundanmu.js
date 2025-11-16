const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function copyFiles(srcDir, destDir) {
  const files = fs.readdirSync(srcDir);
  files.forEach((file) => {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    const stat = fs.statSync(src);
    if (stat.isFile()) {
      fs.copyFileSync(src, dest);
    }
  });
}

const srcProtoDir = path.join(__dirname, '..', 'src', 'proto');
const distProtoDir = path.join(__dirname, '..', 'dist', 'proto');

ensureDir(distProtoDir);
copyFiles(srcProtoDir, distProtoDir);
console.log(`Copied proto files from ${srcProtoDir} to ${distProtoDir}`);