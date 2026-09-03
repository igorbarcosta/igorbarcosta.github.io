# Orientações para agentes

Este repositório é um site Astro estático. Agentes devem preservar a separação entre conteúdo, dados e apresentação.

## Direção arquitetural da integração

A dependência entre os repositórios é permanente e unidirecional: **`academic` → site**.

- `academic` é a fonte canônica de dados e conhecimento acadêmico. Ele concentra conteúdo estruturado, referências, fontes e evidências e deve continuar útil sem este site.
- Este site apenas seleciona, transforma e apresenta uma projeção pública sanitizada do `academic`.
- O `academic` nunca deve importar, referenciar, depender estruturalmente nem possuir conhecimento deste site. Não crie nele estruturas cuja única justificativa seja uma necessidade de renderização do site.
- Dados semanticamente pertencentes ao domínio acadêmico devem ser modelados primeiro no `academic`, de forma canônica e independente de apresentação. Decisões de UI, navegação, layout, componentes, rotas e apresentação pública pertencem exclusivamente ao site.
- Documentos privados, portarias, comprovantes e outras evidências podem ser versionados no `academic` para verificação, mas isso não autoriza sua publicação. O site deve selecionar explicitamente o conteúdo público e nunca receber evidências privadas.
- Novas projeções, como currículos, relatórios, páginas institucionais, APIs ou documentos, devem poder consumir o `academic` sem depender deste site.
- Em toda alteração de integração, verifique explicitamente que a direção continua sendo `academic` → site. Se uma solução introduzir dependência reversa, reformule-a antes de implementar.

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
