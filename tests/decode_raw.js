const fs = require('fs');
const path = require('path');
const { AcFunDanmu } = require('../dist/proto/acfun.js');

const rawDir = path.resolve(__dirname, '../raw-danmu/o8ZOHqETCy8');

async function main() {
  try {
    const files = await fs.promises.readdir(rawDir);
    
    for (const file of files) {
      if (!file.endsWith('.b64')) continue;
      
      const filePath = path.join(rawDir, file);
      const content = await fs.promises.readFile(filePath, 'utf8');
      const buffer = Buffer.from(content, 'base64');
      
      // Parse filename: Category.SignalType.b64
      // e.g. State.CommonStateSignalTopUsers.b64
      const parts = file.split('.');
      if (parts.length < 3) {
        console.log(`Skipping ${file}: invalid format`);
        continue;
      }
      
      const signalType = parts[1];
      
      console.log(`\n--- Decoding ${file} ---`);
      
      const ProtoType = AcFunDanmu[signalType];
      if (!ProtoType) {
        console.log(`Unknown signal type: ${signalType}`);
        continue;
      }
      
      try {
        const decoded = ProtoType.decode(buffer);
        const decodedObj = JSON.parse(JSON.stringify(decoded, (key, value) => {
            if (value && value.type === 'Buffer') {
                return '[Buffer]';
            }
            if (typeof value === 'bigint') {
                return value.toString();
            }
            if (value && typeof value === 'object' && value.constructor && value.constructor.name === 'Long') {
                return value.toString();
            }
            return value;
        }));
        
        console.log(JSON.stringify(decodedObj, null, 2));
        
        // Save to file
        const outputFilename = file.replace('.b64', '.json');
        await fs.promises.writeFile(path.join(rawDir, outputFilename), JSON.stringify(decodedObj, null, 2), 'utf8');
        
      } catch (err) {
        console.error(`Error decoding ${file}:`, err.message);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
