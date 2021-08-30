FROM node:14.17.5
WORKDIR /getting-app
COPY package*.json /getting-app
RUN npm install
COPY . /getting-app/
CMD node ./bin/www
EXPOSE 8000 