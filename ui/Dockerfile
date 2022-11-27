FROM node:lts-alpine3.16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json

# install node dependencies
RUN echo "npm install in progress..." && npm ci && npm cache clean --force

EXPOSE 7778

CMD [ "astro", "dev" ]
