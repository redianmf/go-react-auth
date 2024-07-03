# go-react-auth

Implementation of auth in golang and react js

### Server

```bash
cd server
go mod tidy
```

```bash
cp .env.example .env
```

Create postgres database, setup .env

```bash
make run
```

More info: [Swagger API Documentation](localhost:8080/api/v1/swagger/index.html#)

### Client

```bash
cd client
npm i
```

```bash
npm run dev
```
