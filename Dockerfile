FROM node:slim
RUN mkdir /app
WORKDIR /app
COPY . .
CMD ["node","index.js"]
