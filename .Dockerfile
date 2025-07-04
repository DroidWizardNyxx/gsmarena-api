# 1. Começamos com uma imagem oficial do Playwright.
# Isso já nos dá um Linux com Node.js e todas as dependências do browser instaladas.
FROM mcr.microsoft.com/playwright:v1.53.2-jammy

# 2. Definimos o diretório de trabalho dentro do contêiner.
WORKDIR /app

# 3. Copiamos os arquivos de dependência primeiro.
# Isso aproveita o cache do Docker e acelera builds futuros.
COPY package.json package-lock.json ./

# 4. Instalamos as dependências do nosso projeto.
RUN npm install

# 5. Copiamos todo o resto do nosso código para o contêiner.
COPY . .

# 6. Comando que será executado quando o contêiner iniciar.
# Ele vai rodar o nosso servidor Express.
CMD ["node", "server.js"]
