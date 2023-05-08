FROM mcr.microsoft.com/playwright:latest

WORKDIR usr/src/test

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT["npm", "run"]

CMD ["e2e:test"]
