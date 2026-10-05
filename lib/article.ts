// "a" or "an" for a phrase, by how it sounds rather than how it is spelled:
// "an indoor plant shop", "an heirloom seed company", "a hair salon", and "a"
// for the vowels that start with a "y" sound ("a university"). The template
// pages put the gallery's topics after one, and every topic is a phrase a
// person reads aloud.
//
// No imports, so lib/article.test.mjs runs it under Node's own TypeScript.

const SILENT_H = /^(heir|hour|honest|honou?r)/;
const Y_SOUND = /^(uni|use|usu|uti|ure|eu|ewe|one\b|once\b)/;

export function withArticle(phrase: string): string {
  const word = phrase.trim().toLowerCase();
  const an = (/^[aeiou]/.test(word) && !Y_SOUND.test(word)) || SILENT_H.test(word);

  return `${an ? 'an' : 'a'} ${phrase}`;
}
