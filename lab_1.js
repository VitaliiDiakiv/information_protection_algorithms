const fs = require("fs");
// const alphabet = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Функція для зашифровування тексту шифром зсуву
function encrypt(text, shift) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let isUpperCase = false;

    if (char === char.toUpperCase()) {
      char = char.toLowerCase();
      isUpperCase = true;
    }

    const index = alphabet.indexOf(char);
    if (index === -1) {
      // Якщо символ не знайдено в алфавіті, залишаємо його незмінним
      result += text[i];
    } else {
      const shiftedIndex = (index + shift) % alphabet.length;
      const shiftedChar = alphabet[shiftedIndex];
      result += isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
    }
  }

  return result;
}

// Читаємо текст з файлу
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Зашифровуємо текст з ключем n = 14
  const encryptedText = encrypt(data, 14);

  // Записуємо результат у файл
  fs.writeFile("encrypted.txt", encryptedText, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Текст успішно зашифровано і записано у файл "encrypted.txt"');
  });
});

// Функція для дешифрування тексту з ключем shift
function decrypt(text, shift) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let isUpperCase = false;

    if (char === char.toUpperCase()) {
      char = char.toLowerCase();
      isUpperCase = true;
    }

    const index = alphabet.indexOf(char);
    if (index === -1) {
      result += text[i];
    } else {
      let shiftedIndex = index - shift;
      if (shiftedIndex < 0) {
        shiftedIndex = alphabet.length + shiftedIndex;
      }
      const shiftedChar = alphabet[shiftedIndex];
      result += isUpperCase ? shiftedChar.toUpperCase() : shiftedChar;
    }
  }

  return result;
}

// Читаємо текст з файлу
fs.readFile("encrypted.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Розшифровуємо текст з ключем n = 14
  const decryptedText = decrypt(data, 14);

  // Записуємо результат у файл
  fs.writeFile("decrypted.txt", decryptedText, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Текст успішно розшифровано і записано у файл "decrypted.txt"');
  });
});
