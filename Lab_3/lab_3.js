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

function decryptText(encryptedText) {
  let decryptedText = "";
  let i = 0;
  let charFrequency = {};
  let codeFrequency = {};

  while (i < encryptedText.length) {
    let found = false;

    for (const char in alphabetTable) {
      for (const code of alphabetTable[char]) {
        if (encryptedText.substr(i, 3) === code) {
          decryptedText += char;
          i += 3;
          found = true;
          charFrequency[char] = (charFrequency[char] || 0) + 1;
          codeFrequency[code] = (codeFrequency[code] || 0) + 1;

          break;
        }
      }

      if (found) {
        break;
      }
    }

    if (!found) {
      decryptedText += " ";
      i += 3;

      codeFrequency[" "] = (codeFrequency[" "] || 0) + 1;
    }
  }

  return { decryptedText, charFrequency, codeFrequency };
}

const inputFile = "lab_2_encrypted.txt";
const outputFile = "lab_3_decrypted.txt";

// Зчитування відкритого тексту
const encryptedText = fs.readFileSync(inputFile, "utf-8");

// Дешифрування тексту
const { decryptedText, charFrequency, codeFrequency } =
  decryptText(encryptedText);

const totalChars = decryptedText.length;
const totalCodes = encryptedText.length / 3;
const charFrequencyPercentage = {};
const codeFrequencyPercentage = {};

for (const char in charFrequency) {
  charFrequencyPercentage[char] = (
    (charFrequency[char] / totalChars) *
    100
  ).toFixed(2);
}

for (const code in codeFrequency) {
  codeFrequencyPercentage[code] = (
    (codeFrequency[code] / totalCodes) *
    100
  ).toFixed(2);
}

//Вивід частоти символів  у відкритому тексті
console.log("Таблиця 2 - Частота символів у відкритому тексті (відсотки):");
console.log("Символ\tЧастота, %");
for (const char in charFrequencyPercentage) {
  console.log(`${char}\t${charFrequencyPercentage[char]}`);
}

//Вивід частоти кодів у криптограмі
console.log("\nТаблиця 3 - Частота кодів у криптограмі (відсотки):");
console.log("Код\tЧастота, %");
for (const code in codeFrequencyPercentage) {
  console.log(`${code}\t${codeFrequencyPercentage[code]}`);
}

// Запис дешифрованого тексту у файл lab_3_decrypted.txt
fs.writeFileSync(outputFile, decryptedText, "utf-8");
console.log("Результат збережено у файлі lab_3_decrypted.txt");
