const fs = require("fs");

// Таблиця-ключ
const matrix = [
  ["Д", "Й", "Ц", "А", "Ш", "Ь"],
  ["Ч", "Є", "В", "Р", "З", "Е"],
  ["Б", "Г", "Я", "І", "Ю", "Ж"],
  ["М", "Т", "П", "К", "С", "Л"],
  ["У", "О", "И", "Ф", "Н", "Х"],
];

function findPosition(letter) {
  for (let i = 0; i < 5; i++) {
    const j = matrix[i].indexOf(letter);
    if (j !== -1) {
      return { row: i, col: j, isAlternate: false };
    }
  }
  return null;
}

function decryptText(encryptedText) {
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i += 2) {
    const letter1 = encryptedText[i];
    const letter2 = encryptedText[i + 1];

    const pos1 = findPosition(letter1);
    const pos2 = findPosition(letter2);

    if (pos1 && pos2) {
      if (pos1.row === pos2.row) {
        // Правило 2
        const decryptedLetter1 = matrix[pos1.row][(pos1.col + 5) % 6];
        const decryptedLetter2 = matrix[pos2.row][(pos2.col + 5) % 6];
        decryptedText += decryptedLetter1 + decryptedLetter2;
      } else if (pos1.col === pos2.col) {
        // Правило 3
        const decryptedLetter1 = matrix[(pos1.row + 4) % 5][pos1.col];
        const decryptedLetter2 = matrix[(pos2.row + 4) % 5][pos2.col];
        decryptedText += decryptedLetter1 + decryptedLetter2;
      } else {
        // Правило 1
        const decryptedLetter1 = matrix[pos2.row][pos1.col];
        const decryptedLetter2 = matrix[pos1.row][pos2.col];
        decryptedText += decryptedLetter1 + decryptedLetter2;
      }
    }
  }

  return decryptedText;
}

// Зчитування зашифрованого тексту з файлу lab_5_encrypted.txt
const encryptedTextFromFile = fs
  .readFileSync("lab_5_encrypted.txt", "utf-8")
  .toUpperCase()
  .replace(/\s/g, "");

// Дешифрування тексту
const decryptedText = decryptText(encryptedTextFromFile);

// Запис дешифрованого тексту у файл lab_6_decrypted.txt
fs.writeFileSync("lab_6_decrypted.txt", decryptedText, "utf-8");
console.log("Результат збережено у файлі lab_6_decrypted.txt.");
