import { Router } from "express";
import filePath from "../helpers/filePath.js";

const rulesRouter = new Router();

// Показываем страницу с Пользовательским соглашением
rulesRouter.route("/termsOfUse").get((req, res) => {
      req.body ? res.status(200).render(filePath("views", "termsOfUse", "ejs")) : (res.status(400).send({ error: 'Server GET error in rules-routes.js!' }));
})

// Показываем страницу с Политикой конфиденциальности
rulesRouter.route("/privacyPolicy").get((req, res) => {
      req.body ? res.status(200).render(filePath("views", "privacyPolicy", "ejs")) : (res.status(400).send({ error: 'Server GET error in rules-routes.js!' }));
})

// Показываем страницу с Политикой cookie
rulesRouter.route("/cookiePolicy").get((req, res) => {
      req.body ? res.status(200).render(filePath("views", "cookiePolicy", "ejs")) : (res.status(400).send({ error: 'Server GET error in rules-routes.js!' }));
})


export { rulesRouter };