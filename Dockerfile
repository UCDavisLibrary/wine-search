FROM node:8.1.2

RUN mkdir -p /app/client
COPY dist /app/client/public
COPY server /app/server
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY elasticsearch /app/elasticsearch

RUN cd /app && npm install --production

CMD cd /app && node server