FROM node:10.16-alpine

RUN mkdir /code
WORKDIR /code

COPY . .

RUN npm install

ENTRYPOINT ["npm"]
CMD ["run", "migrate-start"]
