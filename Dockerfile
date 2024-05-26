# Используем официальный образ Node.js
FROM node:alpine as build
# Установка рабочей директории внутри контейнера
WORKDIR /app
# Копируем файлы package.json и package-lock.json (или yarn.lock)
COPY package*.json yarn.lock ./
# Устанавливаем зависимости
RUN npm install
# Копируем остальные файлы проекта
COPY . .
# Собираем проект
RUN npm run build
# Второй этап для production образа
FROM nginx:alpine
# Копируем собранные файлы из первого этапа в nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Копируем конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/nginx.conf
# Команда для запуска nginx
CMD ["nginx", "-g", "daemon off;"]
