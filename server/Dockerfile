FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma db seed && if [ \"$NODE_ENV\" = 'production' ]; then npm run start; else npm run dev; fi"]

# Expose the port
EXPOSE 8000
