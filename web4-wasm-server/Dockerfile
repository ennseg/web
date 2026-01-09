FROM wasmedge/wasmedge

RUN apt update && apt install -y nodejs npm

WORKDIR /app
COPY package.json .
RUN npm install
COPY server.js .

COPY ../check.wasm /wasm/check.wasm

CMD ["node", "server.js"]
