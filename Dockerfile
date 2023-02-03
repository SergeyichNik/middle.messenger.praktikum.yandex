FROM node:18-alpine3.15 as build
WORKDIR /dist
ADD *.json ./
RUN  npm install
ADD . .
RUN  npm run build

FROM node:18-alpine3.15
WORKDIR /dist
ADD package.json ./
RUN npm set-script prepare '' && npm install --omit=dev
COPY --from=build /dist ./

EXPOSE 80

CMD ["node", "serevr.js"]
