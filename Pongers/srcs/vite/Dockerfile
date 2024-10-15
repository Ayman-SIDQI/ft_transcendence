FROM node:18

WORKDIR /app/

COPY ./vite .

RUN npm install --save three

RUN npm install --save-dev vite

# RUN npm set-script dev "vite"
RUN apt-get update && apt-get install -y jq && \
    jq '.scripts += {"dev": "vite", "build": "vite build", "serve": "vite preview"}' package.json > temp.json && \
    mv temp.json package.json

CMD [ "npm", "run", "dev" ]
