import bibtexSource from '../public-data/publications.bib?raw';

export type PublicationType = 'article' | 'conference' | 'chapter' | 'book' | 'software' | 'dataset' | 'preprint' | 'other';

export type Publication = {
  key: string;
  type: PublicationType;
  title: string;
  authors: string;
  year?: string;
  venue?: string;
  publisher?: string;
  doi?: string;
  url?: string;
  selected: boolean;
  project?: string;
};

const typeMap: Record<string, PublicationType> = {
  article: 'article',
  inproceedings: 'conference',
  conference: 'conference',
  incollection: 'chapter',
  book: 'book',
  software: 'software',
  dataset: 'dataset',
  preprint: 'preprint',
};

function clean(value: string) {
  return value.trim().replace(/^\{/, '').replace(/\}$/, '').replace(/^"/, '').replace(/"$/, '').trim();
}

export function parseBibtex(source: string): Publication[] {
  const entries: Publication[] = [];
  const entryPattern = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\n\s*\}/g;
  let match: RegExpExecArray | null;

  while ((match = entryPattern.exec(source)) !== null) {
    const [, rawType, key, body] = match;
    const fields: Record<string, string> = {};
    const fieldPattern = /([a-zA-Z]+)\s*=\s*(?:\{([^{}]*)\}|"([^"]*)"|([^,\n]+))/g;
    let field: RegExpExecArray | null;
    while ((field = fieldPattern.exec(body)) !== null) {
      fields[field[1].toLowerCase()] = clean(field[2] ?? field[3] ?? field[4] ?? '');
    }

    if (!fields.title || !fields.author) continue;
    entries.push({
      key: key.trim(),
      type: typeMap[rawType.toLowerCase()] ?? 'other',
      title: fields.title,
      authors: fields.author,
      year: fields.year,
      venue: fields.journal ?? fields.booktitle,
      publisher: fields.publisher,
      doi: fields.doi,
      url: fields.url,
      selected: fields.selected?.toLowerCase() === 'true',
      project: fields.project,
    });
  }

  return entries.sort((a, b) => (b.year ?? '').localeCompare(a.year ?? ''));
}

export function getPublications() {
  return parseBibtex(bibtexSource);
}
