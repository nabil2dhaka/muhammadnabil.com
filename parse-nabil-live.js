const fs = require('fs');

const html = fs.readFileSync('nabil-live.html', 'utf8');

console.log('=== Title & Description ===');
const title = html.match(/<title>([^<]+)<\/title>/i);
const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
console.log('Title:', title ? title[1] : 'None');
console.log('Description:', desc ? desc[1] : 'None');

console.log('\n=== Headings ===');
const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map(m => m[1] + ': ' + m[2].replace(/<[^>]+>/g, '').trim())
  .filter(h => h.length > 4);
console.log(headings.slice(0, 30));

console.log('\n=== Social / Contact Links ===');
const links = [...html.matchAll(/href=["'](https?:\/\/[^"']+|mailto:[^"']+|tel:[^"']+)["']/gi)].map(m => m[1]);
console.log([...new Set(links)]);

console.log('\n=== Images ===');
const imgs = [...html.matchAll(/src=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi)].map(m => m[1]);
console.log([...new Set(imgs)].slice(0, 20));
