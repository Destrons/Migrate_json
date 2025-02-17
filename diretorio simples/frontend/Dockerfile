# Usa a imagem do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos para o container
COPY package.json ./
COPY package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para dentro do container
COPY . .

# Compila o projeto para produção
RUN npm run build

# Instala o servidor web para servir o frontend
RUN npm install -g serve

# Expõe a porta 3000
EXPOSE 3000

# Comando de inicialização
CMD ["serve", "-s", "build", "-l", "3000"]
