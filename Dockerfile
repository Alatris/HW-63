# Використовуємо офіційний образ Node.js (LTS)
FROM node:lts

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності без зміни package-lock.json
RUN npm ci --only=production

# Копіюємо весь інший код (окрім того, що вказано в .dockerignore)
COPY . .

# Вказуємо порт, який використовує додаток
EXPOSE 3000

# Запускаємо додаток (якщо є start-скрипт у package.json)
CMD ["npm", "start"]