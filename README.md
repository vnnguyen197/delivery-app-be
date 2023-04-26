# OFFICE LUNCH ORDER BACKEND

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/)

# Getting started

- Clone the repository

```
git clone https://github.com/phongledut/delivery-app-be
```

- Install dependencies

```
cd <project_name>
npm install
```

Follow these instructions to run project

- Build and run docker on daemon

```
docker-compose up -d
```

- Push migrations to database

```
npx prisma db push
```

- Copy .env.example to .env.development.local

- Build and run project

```
npm run dev
```
