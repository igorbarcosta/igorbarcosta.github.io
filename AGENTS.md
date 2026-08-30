# Orientações para agentes

Este repositório é um site Astro estático. Agentes devem preservar a separação entre conteúdo, dados e apresentação.

- Este repositório contém apenas a apresentação e uma projeção pública sanitizada. Dados acadêmicos canônicos e evidências privadas pertencem ao repositório privado de origem.
- Nunca adicione evidências, documentos comprobatórios, caminhos de arquivos privados, URLs privadas ou credenciais. Use `.private/` apenas para material local temporário; esse diretório é ignorado pelo Git.
- `src/public-data/` é um artefato materializado. Não edite seus registros como fonte canônica; gere novamente a projeção a partir da base acadêmica privada e revise o diff.

- Conteúdo estruturado deve respeitar os schemas em `src/content.config.ts`.
- Não invente informações biográficas, institucionais, URLs, estudantes, parceiros, resultados ou datas. Use `TODO:` explícito ou deixe o campo opcional vazio quando apropriado.
- Reutilize a projeção existente em `src/public-data/` e a configuração de apresentação em `src/data/site.yaml` em vez de duplicar dados em páginas ou componentes.
- Não replique manualmente atividades atuais entre a home e `/agora`; ambas devem consumir as coleções e a configuração editorial compartilhada.
- Não altere a identidade visual global, o layout ou a paleta sem solicitação explícita.
- Prefira HTML semântico, links acessíveis, conteúdo legível em celular e soluções sem JavaScript quando a interação não exigir JavaScript.
- Ao fazer mudanças estruturais em schemas, rotas, configuração Astro ou dependências, execute `npm run build` antes de concluir.
- Mantenha o build sem backend, banco de dados ou CMS.
- Novas coleções só devem ser introduzidas quando existir uma necessidade editorial clara; relações futuras já podem ser representadas por slugs nos campos `related`, `project` e `publication`.
- Commit, push e deploy não são autorizados automaticamente só porque uma alteração foi concluída. Só execute essas ações quando o usuário pedir explicitamente.
