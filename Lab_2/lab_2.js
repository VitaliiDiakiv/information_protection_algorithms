const fs = require("fs");

const alphabetTable = {
  А: ["159", "352", "487", "623", "701", "832"],
  Б: ["215", "391", "578"],
  В: ["112", "425", "689", "734"],
  Г: ["847"],
  Ґ: ["956"],
  Д: ["179", "283", "496"],
  Е: ["492", "564", "620", "751"],
  Є: ["399"],
  Ж: ["010"],
  З: ["931", "268"],
  И: ["328", "576", "654", "789", "815", "963"],
  І: ["625", "742", "831", "974"],
  Ї: ["013"],
  Й: ["349"],
  К: ["269", "381", "003", "596"],
  Л: ["483", "628", "795"],
  М: ["541", "672", "897"],
  Н: ["125", "278", "379", "542", "637", "759", "868"],
  О: ["297", "563", "614", "726", "812", "949", "971", "104", "276"],
  П: ["388", "671"],
  Р: ["421", "687", "753", "824"],
  С: ["187", "098", "479", "513"],
  Т: ["142", "275", "386", "050"],
  У: ["216", "361", "457"],
  Ф: ["981", "704", "635"],
  Х: ["579"],
  Ц: ["673"],
  Ч: ["738"],
  Ш: ["814"],
  Щ: ["945"],
  Ь: ["613", "779"],
  Ю: ["891"],
  Я: ["642", "793"],
  " ": [
    "538",
    "674",
    "849",
    "925",
    "102",
    "163",
    "289",
    "317",
    "462",
    "598",
    "715",
    "872",
    "941",
    "108",
    "223",
    "334",
    "455",
    "568",
    "686",
    "719",
    "845",
    "927",
    "989",
  ],
};

function encryptText(text) {
  const encryptedText = [];
  for (const char of text) {
    const uppercaseChar = char.toUpperCase();
    if (alphabetTable.hasOwnProperty(uppercaseChar)) {
      const randomIndex = Math.floor(
        Math.random() * alphabetTable[uppercaseChar].length
      );
      encryptedText.push(alphabetTable[uppercaseChar][randomIndex]);
    } else {
      encryptedText.push(
        alphabetTable[" "][
          Math.floor(Math.random() * alphabetTable[" "].length)
        ]
      );
    }
  }
  return encryptedText.join("");
}

const inputFile = "lab_2_input.txt"; // Шлях до вхідного файлу
const outputFile = "lab_2_encrypted.txt"; // Шлях до вихідного файлу

// Зчитування вмісту файлу lab_2_input.txt
const inputText = fs.readFileSync(inputFile, "utf-8");

// Зашифровування тексту
const encryptedText = encryptText(inputText);

// Запис зашифрованого тексту у файл lab_2_encrypted.txt
fs.writeFileSync(outputFile, encryptedText, "utf-8");
console.log("Результат збережено у файлі lab_2_encrypted.txt");
