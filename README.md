# 📚 Home Library Service Part 2

> Manage your home library with view

![Node.js](https://img.shields.io/badge/-Node.js-43853D?style=flat-square&logo=Node.js&logoColor=white) ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=Git&logoColor=white) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=GitHub&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat&logo=Swagger&logoColor=black) ![Postman](https://img.shields.io/badge/-Postman-FF6C37?style=flat&logo=Postman&logoColor=white) ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=Docker&logoColor=white) ![Docker Hub](https://img.shields.io/badge/-Docker%20Hub-2496ED?style=flat&logo=Docker&logoColor=white) ![Prisma](https://img.shields.io/badge/-Prisma-3982CE?style=flat&logo=Prisma&logoColor=white) ![Prisma Studio](https://img.shields.io/badge/-Prisma%20Studio-3982CE?style=flat&logo=Prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=PostgreSQL&logoColor=white)

## :clipboard: Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

You can also see docker images here: **[Application](https://hub.docker.com/repository/docker/wellder00/nodejs2023q2-service-app/general)**, **[PostgresQl](https://hub.docker.com/repository/docker/wellder00/nodejs2023q2-service-db/general)**

## 📦 How to install Home Library Service

- You should be in **[Part_2](https://github.com/wellder00/nodejs2024Q1-service/tree/part_2)** branch.

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

```bash
npm docker:up
```

After create and starting the app on port (**4000** as default) you can open
in your browser OpenAPI documentation by typing

> _http://localhost:4000/doc/_

Also we can work with **postgresql** in manual mode through Prisma studio

```bash
npm docker:studio
```

And open a graphical user interface (GUI) in your browser to work with databases easily

> _http://localhost:5555_

## :test_tube: Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

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

**Link to this task [Containerization](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/containerization), [Database-orm ](https://github.com/AlreadyBored/nodejs-assignments/tree/main/assignments/database-orm).**
