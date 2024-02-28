
![Logo](https://github.com/aman-webdev/swiftsnif/blob/main/extension/img/48x48.png?raw=true)


# Swiftsnif

Shorten, Secure, and Share Your Links with Confidence


## Demo

https://swiftsnif.vercel.app/




## Features

- Protect Shorten URL with Passwords
- Shorten URLs having expiration



## Usage


#### Using App

![Usage](https://github.com/aman-webdev/swiftsnif/assets/78081991/b43fea02-d635-4b2a-adf7-54f053b0e036)

#### Using Extension

![Usage](https://github.com/aman-webdev/swiftsnif/assets/78081991/0cb8d8ae-d31e-45f3-b584-f36c54774242)
## API Reference

#### Create short url

```bash
  POST /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` (body) | `string` | **Required**. URL to be Shortened |

#### Redirect shorten URL

```bash
  GET /:shortId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `shortId` (param)      | `string` | **Required**. URL short Id |


#### Verify Password

```bash
  POST /verify-password?token={token}&method={method}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token` (query param)     | `string` | **Required**. token from redirect |
 `method` (query param)      | `string` | **Optional**. client or server |
  `password` (body)      | `string` | **Required**. password to verify url (Body) |




## Run Locally


Clone the project

```bash
  git clone https://github.com/aman-webdev/swiftsnif.git
```

Go to the project directory

```bash
  cd swiftsnif
```


#

### Docker

```bash
  docker-compose up 
```

### Manual Setup

Client


```bash
  cd client
  npm install
  cp .env.example .env
  npm run dev
```

Server
```bash
  cd server
  npm install
  cp .env.example .env
  npm run dev
```

Extension

##### [Steps to Add or publish extension](https://support.google.com/chrome/a/answer/2714278?hl=en)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Client

`VITE_BE_URL`

Server

`PORT`

`JWT_SECRET`

`FRONTEND_URL`

`MONGOOSE_URL`

