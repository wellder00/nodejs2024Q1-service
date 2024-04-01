# 📚 Home Library Service

> ### **_Manage your home library easily_**

![Node.js](https://img.shields.io/badge/-Node.js-43853D?style=flat-square&logo=Node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=Git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=GitHub&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat&logo=Swagger&logoColor=black) ![Postman](https://img.shields.io/badge/-Postman-FF6C37?style=flat&logo=Postman&logoColor=white) ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=Docker&logoColor=white) ![Docker Hub](https://img.shields.io/badge/-Docker%20Hub-2496ED?style=flat&logo=Docker&logoColor=white) ![Prisma](https://img.shields.io/badge/-Prisma-3982CE?style=flat&logo=Prisma&logoColor=white) ![Prisma Studio](https://img.shields.io/badge/-Prisma%20Studio-3982CE?style=flat&logo=Prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=PostgreSQL&logoColor=white) ![Logging & Error Handling](https://img.shields.io/badge/-Logging%20%26%20Error%20Handling-2A2A72?style=flat&logo=Logstash&logoColor=white) ![Authentication and Authorization](https://img.shields.io/badge/-Authentication%20and%20Authorization-007ACC?style=flat&logo=Auth0&logoColor=white)

## :clipboard: Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

> You can also see docker images here: **[Application](https://hub.docker.com/repository/docker/wellder00/nodejs2023q2-service-app/general)**, **[PostgreSQL](https://hub.docker.com/repository/docker/wellder00/nodejs2023q2-service-db/general)**

## 📦 How to install Home Library Service

- You should be in **[Part_3](https://github.com/wellder00/nodejs2024Q1-service/tree/part_3)** branch.

You can clone this repository:

```bash
$ git@github.com:wellder00/nodejs2024Q1-service.git
```

Or download it by clicking the green "Code" button and then "Download ZIP". Open it in your IDE.

Installing NPM modules:

```bash
npm install
```

Create <kbd>.env</kbd> file in root folder, use <kbd>.env.example</kbd>

## :rocket: Create and running docker container container

To install the entire project and download both the application and database images from Docker Hub with a single command, you can use the following instruction:

```bash
npm docker:up
```

After executing the command, two images will be downloaded from Docker Hub, allowing you to run this application in Docker containers. This setup ensures that both the application and its required database are containerized, providing a consistent and isolated environment for your project.

---

If you want to run this project locally, follow the steps below. It's important to note that you should change the **_HOST_** value in your <kbd>.env</kbd> file to **_localhost_** to indicate that the **_database_** will be running **_locally_**.

###### 1. Start the Database:

Open your terminal and run the following command to start up the database using Docker:

```bash
docker-compose up -d db
```

###### 2. Deploy Prisma Migrations:

Once the database is up and running, you need to deploy your Prisma migrations to set up the database schema. Execute the following command in your terminal:

```bash
npx prisma migrate deploy
```

###### 3. Generate Prisma Client:

After deploying migrations, generate the Prisma client to interact with your database from your application code. Run:

```bash
npx prisma generate
```

###### 4. Start the Project:

Finally, to start your project, use the command:

```bash
npm start:dev
```

This command launches your application in development mode, typically with hot reloading enabled.

After create and starting the app on port (**4000** as default) you can open
in your browser OpenAPI documentation by typing

> http://localhost:4000/doc/

Also we can work with **postgresql** in manual mode through Prisma studio

```bash
npm docker:studio
```

And open a graphical user interface (GUI) in your browser to work with databases easily

> http://localhost:5555

## :test_tube: Testing

After application running open new terminal and enter:

```bash
npm run test
```

```bash
npm run test:auth
```

```bash
npm run test:refresh
```

### To view logs within your Docker app container, navigate to the following directory:

> ***.user/app/loggerHistory***

>This directory contains the log history for your application, providing insights into its runtime behavior and any errors or warnings that have occurred.
Additionally, to facilitate log persistence and easy access, volumes for logging have been configured in the docker-compose.yml file. This setup ensures that logs are stored outside the container, allowing for easier retrieval and analysis without needing to access the container's filesystem directly.

### :pencil2: Auto-fix and Format

```bash
npm run lint
```

```bash
npm run format
```

### :mag_right: Scan Docker containers

You can also run a report on scanning Docker images for vulnerabilities using the docker scout tool. The report is an analysis of two Docker images: nodejs2023q2-service-app and nodejs2023q2-service-db:

```bash
npm docker:scan
```

**Link to this task [REST service: Logging & Error Handling and Authentication and Authorization](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/logging-error-authentication-authorization).**

