const fs = require('fs');

['resume', 'works', 'blog', 'contact'].forEach(p => {
  const html = fs.readFileSync(p + '.html', 'utf8');
  // Look for page content between <header ...</header> and <footer ...</footer>
  const headerEnd = html.indexOf('</header>');
  const footerStart = html.indexOf('<footer');
  if (headerEnd !== -1 && footerStart !== -1) {
    const mainContent = html.substring(headerEnd + 9, footerStart);
    fs.writeFileSync(p + '-main.html', mainContent);
    console.log(`Saved ${p}-main.html (${mainContent.length} bytes)`);
  }
});
