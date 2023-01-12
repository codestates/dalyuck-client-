FROM node:14.16.1

WORKDIR /front

COPY ./package.json /front

COPY ./package-lock.json /front

RUN npm install

RUN npm audit fix

COPY . /front

EXPOSE 3000

CMD ["npm", "start"]
