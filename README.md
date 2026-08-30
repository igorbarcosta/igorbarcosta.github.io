# Site acadêmico de Ígor Barbosa da Costa

Site pessoal acadêmico/profissional para reunir ensino, pesquisa, inovação, projetos, orientações e produção selecionada. O site é estático e contém somente uma projeção pública sanitizada; dados acadêmicos canônicos e evidências permanecem em uma fonte privada separada.

## Stack

- Astro 5 em modo estático;
- Astro Content Collections com schemas Zod para projetos, ensino e orientações;
- Markdown para entidades editoriais;
- YAML para identidade, navegação, links e atividades atuais;
- BibTeX para publicações selecionadas;
- GitHub Actions + GitHub Pages para build e publicação.

## Desenvolvimento local

```bash
npm install
npm run dev
```

O build de produção executa validação de tipos e das coleções antes de gerar `dist/`:

```bash
npm run build
npm run preview
```

## Estrutura principal

```text
src/
  components/       componentes de interface reutilizáveis
  public-data/      projeção pública gerada: perfil, projetos, ensino, orientações e publicações
  data/             configuração de apresentação e validadores da projeção
  layouts/          layout global e metadados
  lib/              helpers, parser BibTeX e caminhos com base do Pages
  pages/            rotas do site
  styles/           identidade visual global
public/             arquivos estáticos
.github/workflows/  build e deploy no GitHub Pages
```

## Publicação de dados acadêmicos

Os registros não são editados canonicamente neste repositório. O fluxo é:

1. adicionar ou editar o registro na base acadêmica privada;
2. definir `visibility` e associar evidências por ID quando necessário;
3. executar a validação e o exportador na base privada;
4. materializar a saída em `src/public-data/`;
5. revisar o diff, executar `npm run build` e publicar o site.

O exportador seleciona apenas registros públicos, usa listas explícitas de campos permitidos e remove `visibility`, IDs de evidência, caminhos, nomes de documentos e qualquer referência privada. O navegador nunca acessa a fonte privada.

`src/data/site.yaml` contém somente decisões de apresentação, como navegação, foto pública e textos editoriais do site.

## GitHub Pages

O workflow em `.github/workflows/deploy.yml` executa `npm ci`, `npm run build` e publica `dist/` usando o ambiente oficial de Pages. Para este site, a URL pública está configurada como `https://igorbarcosta.github.io/` e o `base` fica na raiz. O repositório precisa ser `igorbarcosta/igorbarcosta.github.io`. Para um repositório de projeto, `astro.config.mjs` continua calculando automaticamente `base` como `/<repositorio>/`.

Para domínio próprio, defina `SITE_URL` e, se necessário, `BASE_PATH` no ambiente do workflow. O workflow não é executado localmente e nenhuma operação de commit, push ou deploy faz parte do build.

## Decisões editoriais

O MVP mantém somente as coleções que já têm papel claro: `projects`, `teaching` e `supervision`. `posts`, `talks`, software e datasets são relações previstas no modelo de projetos ou categorias reconhecidas pelo BibTeX, mas só devem virar coleções quando houver conteúdo e necessidade editorial reais. Isso evita uma estrutura vazia difícil de manter.

Publicações usam BibTeX como fonte principal porque é portátil, fácil de versionar e compatível com futura exportação ou enriquecimento. O parser local é deliberadamente pequeno e cobre o vocabulário do site sem introduzir um gerenciador bibliográfico ou dependência de backend.
