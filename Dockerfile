# 1. Сборка приложения
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# 2. Запуск через Nginx
FROM nginx:alpine

# удаляем дефолтный конфиг nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# копируем свой конфиг (создадим ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# копируем билд React
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]