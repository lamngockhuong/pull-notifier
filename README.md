# pull-notifier
Notify via chatwork & slack when pull request created

![Screenshot from 2021-09-13 00-58-48](https://user-images.githubusercontent.com/16838267/132997883-e73aad04-a57f-4dfd-bd5c-9c33c0e385ef.png)

## Run locally

### Run docker
```shell
docker network create shared_network
docker-compose up -d
```

### Exec migration
```shell
docker-compose exec backend sh -c 'npm run prisma:migrate'
```

## Update packages

I'm using [npm-check-updates] (https://www.npmjs.com/package/npm-check-updates).
Please install it globally.
```shell
npm install -g npm-check-updates
```

Upgrade the specified version in packages.json
```shell
npm run packages:update
```
