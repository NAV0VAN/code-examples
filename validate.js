export { validate };
/** *
 * Перечень шаблонов для проверки валидности
 */
const regExpDictionary = {
      email: RegExp("^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*.[a-zA-Z]{2,6}$"),
      telefon: RegExp(
            "^[+]?[78][-(]?[0-9]{3}[)]?-?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$"
      ),
      password: RegExp("^[a-zA-Z0-9%@#$]{8,20}$"),
      social: RegExp("^(vkontakte).|^(vk).|^(ok).|^(uslugi.yandex.ru/profile)"),
      price: RegExp("^[0-9][0-9]"),
};

/** *
 * Функция validate(elem){} проверяет данные, вводимые в форму авторизации (поле input с data-val-requared)
 * @param {HTMLInputElement} elem
 * @returns {Boolean} результат проверки (resValid)
 */
function validate(elem) {
      try {
            // ищем атрибут (нужно ли проверять)?
            const regExpName = elem.dataset.valRequired;

            // если не требует проверки - возвращаем TRUE
            if (!regExpDictionary[regExpName]) return true;
            if (regExpName == "social") {
                  elem.value = elem.value.trim().replace(/(https:\/\/)/, "");
            }
            // проверяем по шаблону и возвращаем результат проверки
            return regExpDictionary[regExpName].test(elem.value);
      } catch (error) {
            throw new Error(error)
      }
}
