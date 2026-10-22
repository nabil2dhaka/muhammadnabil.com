const fs = require('fs');

['about', 'contact'].forEach(p => {
  const html = fs.readFileSync('nabil-' + p + '.html', 'utf8');
  console.log(`\n=================== NABIL ${p.toUpperCase()} ===================`);
  
  // Headings
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map(m => m[1] + ': ' + m[2].replace(/<[^>]+>/g, '').trim())
    .filter(h => h.length > 3);
  console.log('Headings:', headings);

  // Paragraphs
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&nbsp;/g, ' ').trim())
    .filter(t => t.length > 25);
  console.log('Paragraphs count:', paragraphs.length);
  console.log('Sample paragraphs:\n', paragraphs.slice(0, 10).join('\n---\n'));

  // Emails / Phones
  const emails = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  console.log('Emails:', [...new Set(emails)]);
  const phones = html.match(/(?:\+880|880|01)[0-9]{8,10}/g);
  console.log('Phones:', [...new Set(phones)]);

  // Links
  const links = [...html.matchAll(/href=["'](https?:\/\/[^"']+|mailto:[^"']+|tel:[^"']+)["']/gi)].map(m => m[1]);
  console.log('Social/Contact links:', [...new Set(links.filter(l => !l.includes('wp-') && !l.includes('muhammadnabil.com') && !l.includes('fonts.')))]);
});
