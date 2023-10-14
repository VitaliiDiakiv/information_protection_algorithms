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

    // Перевірка для альтернативних букв (Щ/Ш, Ї/І)
    const alternateLetters = {
      Щ: "Ш",
      Ї: "І",
    };
    const alternateLetter = alternateLetters[letter];
    const alternateLetterIndex = matrix[i].indexOf(alternateLetter);
    if (alternateLetterIndex !== -1) {
      return { row: i, col: alternateLetterIndex, isAlternate: true };
    }
  }
  return null;
}

// Функція для шифрування тексту методом Плейфера
function encryptText(text) {
  let encryptedText = "";
  if (text.length % 2 !== 0) {
    text += "Х";
  }

  for (let i = 0; i < text.length; i += 2) {
    const letter1 = text[i];
    const letter2 = text[i + 1];

    const pos1 = findPosition(letter1);
    const pos2 = findPosition(letter2);

    if (pos1 && pos2) {
      if (pos1.row === pos2.row) {
        // Правило 2
        const encryptedLetter1 = matrix[pos1.row][(pos1.col + 1) % 6];
        const encryptedLetter2 = matrix[pos2.row][(pos2.col + 1) % 6];
        encryptedText += encryptedLetter1 + encryptedLetter2;
      } else if (pos1.col === pos2.col) {
        // Правило 3
        const encryptedLetter1 = matrix[(pos1.row + 1) % 5][pos1.col];
        const encryptedLetter2 = matrix[(pos2.row + 1) % 5][pos2.col];
        encryptedText += encryptedLetter1 + encryptedLetter2;
      } else {
        // Правило 1
        const encryptedLetter1 = matrix[pos2.row][pos1.col];
        const encryptedLetter2 = matrix[pos1.row][pos2.col];
        encryptedText += encryptedLetter1 + encryptedLetter2;
      }
    }
  }
  return encryptedText;
}

// Зчитування вмісту файлу lab_5_input.txt
const inputText = fs
  .readFileSync("lab_5_input.txt", "utf-8")
  .toUpperCase()
  .replace(/\s/g, "");

// Зашифровування тексту
const encryptedText = encryptText(inputText);

// Запис зашифрованого тексту у файл lab_5_encrypted.txt
fs.writeFileSync("lab_5_encrypted.txt", encryptedText, "utf-8");
console.log("Результат збережено у файлі lab_5_encrypted.txt.");
