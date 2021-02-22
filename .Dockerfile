FROM node:14

WORKDIR /app
COPY ./package.json tsconfig.json ./
COPY ./tsconfig.json ./
COPY src ./src
RUN npm install --silent
RUN npm run build

COPY . ./

CMD ["npm", "start"]