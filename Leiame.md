# Core Lab Challenge - Frontend

Este repositório contém a aplicação **Frontend** do desafio Core Lab, construída com **Next.js 15.2.2** e **Node.js 20.17.0**.

## Tecnologias Utilizadas

As seguintes tecnologias foram usadas para construir a aplicação:

- **NodeJS**: 20.17.0
- **Next.js**: 15.2.2
- **React**: 19.0.0
- **sass**: 1.85.1

## Configuração

*Esta aplicação depende do backend já configurado. Para rodar o frontend, garanta que o backend esteja rodando antes e siga os passos abaixo.*

### Passos para Instalação

1. **Clone ou faça um fork deste repositório** para sua máquina.
   
2. **Abra o terminal** e certifique-se de que está na raiz do projeto antes de rodar os seguintes comandos.

3. **Instale as dependências do projeto**:
   ```bash
   npm install
   ```

4. **Crie o arquivo `.env.local`** baseado no arquivo `.env.local.example`:
   - Renomeie o arquivo `.env.local.example` para `.env.local`.
   - Modifique as seguintes variáveis de acordo com a configuração do backend:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"  # URL da sua API Backend
   ```

5. **Execute a aplicação**:
   ```bash
   npm run dev
   ```

6. Abra o navegador e acesse `http://localhost:3000` para ver a aplicação em funcionamento.

### Rodando a Aplicação com Docker

Se preferir rodar a aplicação usando o Docker, siga os passos abaixo:

1. **Crie a imagem Docker**:
   ```bash
   docker build -t corelab-frontend .
   ```

2. **Rode um container da imagem criada**:
   ```bash
   docker run --name corelab-web-container -p 3000:3000 -d corelab-frontend
   ```

3. Abra o navegador e acesse `http://localhost:3000` para ver a aplicação rodando no container.

### Parando e Removendo o Container Docker

Para parar e remover o container Docker, siga os passos abaixo:

1. **Pare o container em execução**:
   ```bash
   docker stop corelab-web-container
   ```

2. **Remova o container parado**:
   ```bash
   docker rm corelab-web-container
   ```

## Próximos Passos

Para mais informações sobre a configuração do backend, consulte o arquivo [README do Backend](https://github.com/caio-ferreira-dev/corelab-api-challenge-php). 🚀
