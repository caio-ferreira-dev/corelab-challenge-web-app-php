# Pull Request - Frontend

## Descrição

Adaptei o ambiente para utilizar Next.js, garantindo uma base moderna e performática para o projeto. Em seguida, desenvolvi a home page, que serve como uma introdução ao sistema, contendo um parágrafo explicativo e botões para as páginas de "Login" e "Registro".

Implementei as páginas de login e registro, cada uma com seus respectivos componentes de formulários, configurando em conjunto o TanStack Query e uma instância do Axios para a comunicações com a API. Depois, criei a página "dashboard", onde desenvolvi os principais componentes da interface providenciada: `Header`, `NewNote`, `Note`, `NoteList` e `ColorBar`. As integrações de "CRUD" com a API foram realizadas ao decorrer do desenvolvimento, assim como a validação contínua da responsividade em diferentes tamanhos de tela em cada componente e a fidelidade ao modelo fornecido da interface.

Adicionei um `Dockerfile` para facilitar a compatibilidade e a execução do projeto em diferentes ambientes. Por fim, implementei o componente `ColorFilter` e tratei exceções na instância do Axios para uma melhor gestão de erros.
