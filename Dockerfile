FROM node:18.17.1-alpine3.18 as builder

WORKDIR /app
COPY . ./
RUN npm install --legacy-peer-deps && npm run build
# EXPOSE 80
# EXPOSE 443
#FROM nginx:1.24-alpine3.17
FROM nginx:1.25.1-alpine-slim

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

#npm i react-transliterate --legacy-peer-deps
#npm install --legacy-peer-deps

#1.25.1-alpine-slim
