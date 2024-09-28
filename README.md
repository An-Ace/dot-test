# SISTEM GUDANG
## Test From DOT-INDONESIA
### Description
**This application is a test of DOT-INDONESIA.**
### [LIVE SERVER](http://www.ditopupin.com)
### Use Stack
- **Nest JS as Backend Framework API**
- **Typescript as Backend Language**
- **PASSPORT as Middleware (USE 0AUTH LOGIN GOOGLE & CREDENTIALS)**
- **Vue JS as Frontend Framework**
- **Postgres as DBMS**
- **Tailwind as CSS Utility**
- **NAIVE UI as Frontend UI**
- **Docker Container**
- **Nginx**
- **PRISMA as ORM**
- **REDIS as CACHE MANAGEMENT**


## Installations Production
**IF YOU WANT TO RUN THIS APPLICATION IN PRODUCTION, YOU NEED TO HAVE DOCKER INSTALLED*
- **Clone this repository**
- **Run `docker-compose build`**
- **Run `docker-compose up -d`**
- **Run `docker exec app-nasrulloh npx prisma migrate dev`**
- **Open In Brower Or Click -> ['localhost:3000'](http://localhost:3000)**
- **You can Register an Account On: -> ['localhost:3000/signup'](http://localhost:3000/signup)**


## Backend Tests
- **Open Here:** [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/30824227-a2cecd6a-8f66-453b-8735-6aa6516aafe6?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30824227-a2cecd6a-8f66-453b-8735-6aa6516aafe6%26entityType%3Dcollection%26workspaceId%3D769e76e8-6653-4f8a-9f6d-c81d4cf36985) **And Choose <ins>import a copy</ins>**
- **SignUp Account on Auth Tab**
- **For Example:**
  - **Name:** `Test Demo`
  - **Email:** `test@demo.com`
  - **Password:** `password`
- **Copy Token from the response (data.token)**
- **Paste to env Tab -> variable: bearerToken**
- **After Have Bearer Token, You Can Access All APIs**