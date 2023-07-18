# DELEVERY APP ORDER BACKEND

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
- Copy .env.example to .env.development.local and .env (create a file .env for run prisma)

Create Email or Login ethereal mail (https://ethereal.email)
- If create account ethereal -> Change account MAIL_FROM and MAIL_PASSWORD in file env with account created
- If use Account in env.example -> Login ethereal email for get message OTP

Follow these instructions to run project
- Build and run docker on daemon
- Please install docker before run command

```
docker-compose up -d
```

- Push migrations to database

```
npx prisma db push
```

- Seeder data account admin 

```
yarn seeder
```

- Build and run project

```
npm run dev
```
# delivery-app-be
# delivery-app-be
# delivery-app-be
# delivery-app-be
# delivery-app-be
# delivery-app-be
# delivery-app-be
