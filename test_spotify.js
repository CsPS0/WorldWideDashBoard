const cheerio = require('cheerio');

async function test() {
  const res = await fetch('https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const text = $('script').filter((i, el) => $(el).html().includes('monthlyListeners')).html();
  if (text) {
     console.log("Found script tag with listeners");
     const regex = /"monthlyListeners":(\d+)/;
     const match = text.match(regex);
     if (match) console.log("Listeners:", match[1]);
  } else {
     console.log("Not found in scripts");
  }
}
test();
