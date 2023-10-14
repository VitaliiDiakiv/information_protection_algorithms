const fs = require("fs");

const alphabet = {
  а: 28,
  б: 26,
  в: 13,
  г: 11,
  ґ: 14,
  д: 25,
  е: 7,
  є: 15,
  ж: 16,
  з: 1,
  и: 6,
  і: 0,
  ї: 10,
  й: 30,
  к: 22,
  л: 29,
  м: 12,
  н: 32,
  о: 9,
  п: 5,
  р: 3,
  с: 2,
  т: 31,
  у: 17,
  ф: 18,
  х: 8,
  ц: 21,
  ч: 20,
  ш: 23,
  щ: 4,
  ь: 19,
  ю: 24,
  я: 27,
};

function encryptModular(text, key) {
  let encryptedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    if (alphabet[char] !== undefined) {
      const keyChar = key[i % key.length];
      const encryptedCharCode = (alphabet[char] + alphabet[keyChar]) % 33;
      const encryptedChar = Object.keys(alphabet).find(
        (key) => alphabet[key] === encryptedCharCode
      );
      encryptedText += encryptedChar;
    } else {
      encryptedText += text[i];
    }
  }

  return encryptedText;
}

function decryptModular(encryptedText, key) {
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i].toLowerCase();
    if (alphabet[char] !== undefined) {
      const keyChar = key[i % key.length];
      const decryptedCharCode = (alphabet[char] - alphabet[keyChar] + 33) % 33;
      const decryptedChar = Object.keys(alphabet).find(
        (key) => alphabet[key] === decryptedCharCode
      );
      decryptedText += decryptedChar;
    } else {
      decryptedText += encryptedText[i];
    }
  }

  return decryptedText;
}

// Зчитування відкритого тексту з файлу
const plaintext = fs.readFileSync("lab_4_input.txt", "utf-8");
const key = "баскетбол";

// Шифрування тексту
const encryptedText = encryptModular(plaintext, key);
fs.writeFileSync("lab_4_encrypted.txt", encryptedText);
console.log("Результат збережено у файлі lab_4_encrypted.txt");

// Розшифрування тексту
const decryptedText = decryptModular(encryptedText, key);
fs.writeFileSync("lab_4_decrypted.txt", decryptedText);
console.log("Результат збережено у файлі lab_4_decrypted.txt");
