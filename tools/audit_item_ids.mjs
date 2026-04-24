import { languagePacks } from "../language-packs.js?v=item-id-audit";

const failures = [];

for (const [language, pack] of Object.entries(languagePacks)) {
  for (const [kind, categories] of Object.entries(pack.datasets)) {
    for (const [category, data] of Object.entries(categories)) {
      const seen = new Set();
      for (const item of data.words) {
        const location = `${language}.${kind}.${category}: ${item.english} = ${item.japanese}`;
        if (!item.id) {
          failures.push(`missing id: ${location}`);
          continue;
        }
        if (!item.meaningId) {
          failures.push(`missing meaningId: ${location}`);
        }
        if (seen.has(item.id)) {
          failures.push(`duplicate id: ${location} (${item.id})`);
        }
        seen.add(item.id);
      }
    }
  }
}

if (failures.length) {
  console.error(`Item ID audit failed (${failures.length})`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`...and ${failures.length - 200} more`);
  process.exit(1);
}

console.log("Item ID audit passed");
