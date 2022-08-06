FROM node:18.7.0

WORKDIR /app
COPY . .
RUN chmod u+x bin -R
COPY bin/* /bin
RUN npm ci
