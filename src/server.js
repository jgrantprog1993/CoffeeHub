import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import Joi from "joi";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import Inert from "@hapi/inert";
import dotenv from "dotenv";
import HapiSwagger from "hapi-swagger";
//import jwt from "hapi-auth-jwt2";
//import { validate } from "./api/jwt-utils.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";


import { webRoutes } from "./web-routes.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  info: {
    title: "PlaceMark API",
    version: "0.1",
  },
};
async function init() {
  const server = Hapi.server({
    port: 3000, 
    host: "localhost",
  });

  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  //await server.register(jwt);
  server.validator(Joi);
  // https://github.com/toymachiner62/hapi-authorization
  let plugins = [
    {
      plugin: require('hapi-auth-basic')
    },
    {
      plugin: require('hapi-authorization'),
      options: {
        roles: false	
      }
    }
  ];
  
  await server.register(plugins);

  server.views({ 
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true, 
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.default("session");

  //server.auth.strategy("jwt", "jwt", {
  //  key: process.env.cookie_password,
  //  validate: validate,
  //  verifyOptions: { algorithms: ["HS256"] }
  //});

  db.init("json");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);


  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();