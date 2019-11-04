Variáveis de ambiente utilizadas no projeto (.env):
```
W2M_DB_URI=mongodb://localhost:27017
W2M_DB_NAME=Wine2Me
W2M_LOGGER_LEVEL=debug
W2M_API_PORT=3001
```

Para instalar e rodar uma imagem do mongodb local em docker, rodar o seguinte comando:
```
docker run --name adega-mongo --restart always -d -p 27017:27017 mongo:4.2.0
```

Para visualizar a documentação da api, acessar a rota:
```
http://endereco/api/docs
```

O projeto utiliza a técnologia 'migrate-mongo' para realizar migrações de dados no banco

Para realizar as operações UP, utilizar os seguintes comandos:
```
npm run migrate

OU

npx migrate-mongo up
```

Para realizar as operações DOWN, utilizar o seguinte comando:
```
npx migrate-mongo down
```
OBSERVAÇÃO: o comando desfaz somente a ultima migração UP, então deve-se
repetir o comando até o ponto necessário ou até todas as migrações serem desfeitas


Para gerar a imagem e enviar para o registry. Substituir o $VERSAO pela versão correta.
```
docker build -t minhaadega/api:$VERSAO  .
docker tag minhaadega/api:$VERSAO registry.softdesign-rs.com.br/minhaadega/api:$VERSAO
docker push registry.softdesign-rs.com.br/minhaadega/api:$VERSAO
```