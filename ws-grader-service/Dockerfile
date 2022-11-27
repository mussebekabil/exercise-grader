FROM denoland/deno:alpine-1.26.2

EXPOSE 7779

WORKDIR /app

COPY . .

RUN deno cache deps.js

CMD [ "run", "--watch", "--allow-all", "app.js" ]
