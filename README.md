# Simple Graphql Project

1. Install dependencies with ```npm install```
2. Copy .env.template content to .env file
3. Configure ```MONGODB_STRING``` url in environment file with your mongodb connection url, if you do not have any, you can keep .env.template connection string and run below commands (with docker) for setup example database:
```
docker pull mongo
docker run --name gqlapi-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=root -e MONGO_INITDB_DATABASE=employees -d mongo
```
4. Start application with ```npm run start```
5. Open http://localhost:4000/ in your browser
