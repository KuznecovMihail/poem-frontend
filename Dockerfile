FROM node:18.16.0-alpine AS builder

WORKDIR /app

COPY public ./public
COPY src ./src
COPY .dockerignore .
COPY .gitignore .
COPY .gitlab-ci.yml .
COPY package.json .
COPY package-lock.json .
COPY README.md .

RUN npm install

RUN npm run build

FROM nginx:1.25.0-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=builder /app/build .

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]

