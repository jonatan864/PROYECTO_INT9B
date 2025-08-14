# Usa la imagen base de Node.js
FROM node:18

# Crea un directorio en el contenedor
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto (ajústalo según tu app)
EXPOSE 3000

# Comando que ejecuta tu app
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]
