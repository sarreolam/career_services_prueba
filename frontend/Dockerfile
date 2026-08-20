FROM node:20-alpine

WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

EXPOSE 5173

# Se agrega --host para exponer el puerto hacia afuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]