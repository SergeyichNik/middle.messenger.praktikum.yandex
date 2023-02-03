FROM node:18-alpine3.15 as build
WORKDIR /dist
ADD *.json ./
RUN  npm install
ADD . .
RUN  npm run build

FROM node:18-alpine3.15
WORKDIR /dist
ADD package.json ./
RUN npm install
COPY --from=build /dist ./

EXPOSE 3000

CMD ["node", "server.js"]
