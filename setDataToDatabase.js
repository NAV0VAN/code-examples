/**
 *  Модуль записи данных в базу данных
 */
import mysql from "mysql2";
import connectPool from "./bd.connection.js";
import { clearDataFromDatabaseByTime } from "../helpers/clearDataFromDatabasebyTime.js";
import { fwUserInfoToString } from "../helpers/allRoutesHelpers.js";

export { setColumnData, setAllColumnData, updateColumnData };


/**
 * Функция записи всех значений из объекта в таблицу
 * @param {String} tableName  - именование таблицы для записи данных
 * @param {String} columnName - именование столбцов для записи данных
 * @param {String} value - значение  столбцов для записи данных
 * @returns {Array} значения записей столбца
 */

async function setAllColumnData(tableName, object) {
  try {
    let sql = `INSERT INTO ${tableName} SET ?`;
    sql = mysql.format(sql, [object]);

    await connectPool
      .query(sql)
      .then((result) => {
        clearDataFromDatabaseByTime(`user`, "3 WEEK");
      })
      .catch((err) => {
        throw new Error(
          "ERROR in setAllColumnData()",
          err
        );
      });
  } catch (error) {
    throw new Error(
      "ERROR in setAllColumnData()",
      error
    );
  }

}

/**
 * Функция записи одного значения в таблицу с исключением дублей
 * @param {String} tableName  - именование таблицы для записи данных
 * @param {String} columnName - именование столбца для записи данных
 * @param {String} value - значение  столбца для записи данных
 * @returns {Array} значения записи столбца
 */

async function setColumnData(
  tableName,
  columnName_1,
  columnName_2,
  value_1,
  value_2
) {
  try {
    await connectPool
      // проверим наличие аналогичной записи
      .query(`SELECT ?? FROM ?? WHERE  ??=\"${value_2}\"`, [
        columnName_2,
        tableName,
        columnName_2,
      ])
      .then((result) => {
        // записываем, если не дубль
        if (result[0].length == 0) {
          connectPool
            .query(`INSERT INTO ?? (??,??) VALUES (\"${value_1}\",\"${value_2}\")`, [
              tableName,
              columnName_1,
              columnName_2,
            ])
            .then((result) => clearDataFromDatabaseByTime(`user`, "3 WEEK"))
        }
      })
      .catch((err) => {
        throw new Error("ERROR in setColumnData()", err);
      });
  } catch (error) {
    throw new Error("ERROR in setColumnData()", err);
  }
}

/**
 *  Функция обновления уже имеющейся записи
 * @param {*} tableName - именование таблицы
 * @param {*} fwUserInfo - объект с данными пользователя
 * @param {*} condition - условие запроса WHERE
 */
async function updateColumnData(tableName, fwUserInfo, condition) {
  try {
    let updateData = fwUserInfoToString(fwUserInfo);
    await connectPool
      .query(
        `UPDATE \`${tableName}\` SET ${updateData.columnNamesAndValues} WHERE ${condition} `
      ).catch((err) => {
        throw new Error("ERROR in updateColumnData()", err);
      });
  } catch (error) {
    throw new Error("ERROR in updateColumnData()", err);
  }
}