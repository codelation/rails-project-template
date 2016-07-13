import Sizzle from 'sizzle';

let authenticityToken = null;
let metaTag = new Sizzle('meta[name="csrf-token"]')[0];

if (metaTag !== undefined) {
  authenticityToken = metaTag.content;
}

module.exports = authenticityToken;
