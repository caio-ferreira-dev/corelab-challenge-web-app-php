# Usar Node.js 18 (ou a versão necessária para Next.js 15)
FROM node:18

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências do Next.js
RUN npm install

# Build do Next.js
RUN npm run build

# Expor porta
EXPOSE 3000

# Iniciar o servidor Next.js
CMD ["npm", "run", "start"]
