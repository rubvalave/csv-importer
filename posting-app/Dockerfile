FROM node:14.17.5
WORKDIR /posting-app
COPY package*.json /posting-app
RUN npm install
COPY . /posting-app/
CMD node ./bin/www
EXPOSE 8000 