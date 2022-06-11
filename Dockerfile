# immagine nodejs per la build di produzione
FROM node:16.10.0-alpine3.14 as builder
WORKDIR '/app'
COPY package*.json ./
# login token es. docker build --build-arg NPM_TOKEN=AAABBBCCCTOKEN .
ARG NPM_TOKEN
# skippa verifica certificati tls e login
COPY .npmrc.docker /root/.npmrc
RUN npm ci
COPY . .
RUN npx ng build --configuration production FrontendRVA1

# immagine finale con solo nginx, transpilato, html, css
FROM nginx:1.21.6-alpine
EXPOSE 80
COPY --from=builder /app/dist/FrontendRVA1 /usr/share/nginx/html
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
