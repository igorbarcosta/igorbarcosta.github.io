import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', '.astro']);
const forbiddenDirectories = new Set(['.private', 'private', 'private-evidence', 'evidence']);
const sensitiveDocumentName = /(portaria|comprovante|certificado|declaracao|declaração)/i;
const documentPattern = /\.(?:pdf|docx?|xlsx?|pptx?|odt|ods|zip)$/i;
const forbiddenReference = /(github\.com\/igorbarcosta\/academic|private\/evidence|\/home\/igorbarcosta|file:\/\/)/i;
const textPattern = /\.(?:astro|bib|css|html|js|json|md|mjs|ts|txt|ya?ml)$/i;
const violations = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const absolute = join(directory, entry.name);
    const local = relative(root, absolute);
    if (entry.isDirectory()) {
      if (forbiddenDirectories.has(entry.name)) violations.push(`${local}/: diretório privado proibido`);
      files.push(...walk(absolute));
    } else {
      files.push(absolute);
    }
  }
  return files;
}

for (const file of walk(root)) {
  const local = relative(root, file);
  if (documentPattern.test(file) && sensitiveDocumentName.test(basename(file))) {
    violations.push(`${local}: documento comprobatório proibido`);
  }
  if (textPattern.test(file) && forbiddenReference.test(readFileSync(file, 'utf8'))) {
    violations.push(`${local}: referência privada proibida`);
  }
}

if (violations.length) {
  throw new Error(`A auditoria de privacidade encontrou violações:\n${violations.map((item) => `- ${item}`).join('\n')}`);
}

console.log('Verificação de privacidade: nenhum diretório, documento ou caminho privado foi encontrado.');
