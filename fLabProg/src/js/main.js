import {algoProcess} from "./modules/algoProcess";
import {loadToInput} from "./modules/loadFileProcess";
import {checkNums, validateInput} from "./helper/helpers";

window.addEventListener('DOMContentLoaded', () => {
    "use strict"

    const generateBtn = document.querySelector(".btn-generate"),
        uploadBtn = document.querySelector(".btn-upload");

    loadToInput();

    algoProcess(generateBtn, false);                       //запускаем моделирование для данных, сгенерированных на клиенте
    algoProcess(uploadBtn, true);     //запускаем моделирование для данных, загруженных из файла
});