import { Router } from "express";
import { getSearchData } from "../helpers/getDataFromDatabase.js";

export { routerSearchWork };

const routerSearchWork = new Router();

/**
 * ROUTES
 */

/**
 *   POST-запрос при передаче данных, введенных пользователем
 */
routerSearchWork.route("/search-work").post((req, res) => {
      if (!req.body) return res.status(400).send({ error: 'Server POST error in search-routes.js!' });

      let searchWord = JSON.parse(req.body);
      searchWord !== null
            ? (searchWord = searchWord.toString())
            : (searchWord = "");

      const strSearchWords = setRequestString(searchWord)

      // исключаем пустоту или ввод латиницей
      if (strSearchWords != "" && !/[A-Za-z]/.exec(strSearchWords)) {
            getSearchData(
                  "service_element",
                  "service_element_id`,`service_id`,`service_element_name",
                  "service_element_name",
                  strSearchWords
            ).then((result) => {
                  result ? res.send(JSON.stringify(result)) : res.send([]);
            });
      } else {
            res.send([]);
      }
});

routerSearchWork.route("/search-buysell").post((req, res) => {
      if (!req.body) return res.status(400).send({ error: 'Server POST error in search-routes.js!' });

      let searchWord = JSON.parse(req.body);
      searchWord !== null
            ? (searchWord = searchWord.toString())
            : (searchWord = "");

      const strSearchWords = setRequestString(searchWord)

      // исключаем пустоту или ввод латиницей
      if (strSearchWords != "" && !/[A-Za-z]/.exec(strSearchWords)) {
            getSearchData(
                  "buySell_element",
                  "buySell_element_id`,`buySell_id`,`buySell_element_name",
                  "buySell_element_name",
                  strSearchWords
            ).then((result) => {
                  result ? res.send(JSON.stringify(result)) : res.send([]);
            });
      } else {
            res.send([]);
      }
});


/**
 * FUNCTIONS
 */

/**
 * Функция  формирует строку запроса для неточного поиска в базе данных
 * @param {string} str 
 * @returns 
 */
function setRequestString(str) {
      try {
            let strSearchWords = "";
            let arrSearchWords = [],
                  resultArrSearchWords = [];

            // формируем строку запроса для неточного поиска в базе данных
            arrSearchWords = str.trim().replace(",", "").split(" ");
            if (arrSearchWords.length > 1) {
                  arrSearchWords.forEach((el) => {
                        el.length >= 5
                              ? (el = el.slice(0, el.length - 2))
                              : (el = el);
                        resultArrSearchWords.push(el);
                  });
                  strSearchWords = resultArrSearchWords.join("% %");
            } else {
                  strSearchWords = arrSearchWords;
            }
            return strSearchWords
      } catch (error) {
            throw new Error("ERROR in setRequestString()", error)
      }
}