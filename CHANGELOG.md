# Changelog


## v0.0.3

[compare changes](https://github.com/merkulovka/use-l5/compare/v0.0.2...v0.0.3)

### 🚀 Enhancements

- Добавил опциональный пересчет фильтров в updateDefaults по флагу ([5ada55c](https://github.com/merkulovka/use-l5/commit/5ada55c))

### 🩹 Fixes

- Исправлена типизация дефолтных значений передающихся в опциях ([8691e50](https://github.com/merkulovka/use-l5/commit/8691e50))
- Исправлен баг при парсинге массива чисел, при котором 0 не учитывался и пропадал ([3ababe3](https://github.com/merkulovka/use-l5/commit/3ababe3))
- Поправил типизацию ([910ab19](https://github.com/merkulovka/use-l5/commit/910ab19))
- Исправил мгновенное обновление queryForApi при syncWithRoute ([5256c94](https://github.com/merkulovka/use-l5/commit/5256c94))
- Привел типы updateDefaults и defaultsRef к defaults ([a339347](https://github.com/merkulovka/use-l5/commit/a339347))
- Расширил тип transformOutput до строковых ключей ([87fc9c5](https://github.com/merkulovka/use-l5/commit/87fc9c5))
- Уточнил типизацию defaults в buildQueryForUrl ([40db3be](https://github.com/merkulovka/use-l5/commit/40db3be))
- Исключил пустые массивы из query и исправил тесты ([fadebfb](https://github.com/merkulovka/use-l5/commit/fadebfb))

### 📖 Documentation

- Обновил README для текущего поведения useL5 ([51d75b4](https://github.com/merkulovka/use-l5/commit/51d75b4))

### 🏡 Chore

- **release:** V0.0.2 ([d28e070](https://github.com/merkulovka/use-l5/commit/d28e070))
- Удалил упоминание нереализованного функционала 'transformInput', т.к. на текущий момент считаю эту функцию не нужной ([2815d88](https://github.com/merkulovka/use-l5/commit/2815d88))
- Улучшил читаемость функции buildQueryForApi ([9f3758a](https://github.com/merkulovka/use-l5/commit/9f3758a))

### ✅ Tests

- Добавил покрытие syncWithRoute в useL5 ([230d487](https://github.com/merkulovka/use-l5/commit/230d487))

### ❤️ Contributors

- Kirillmerkulov <kirill_tagil9@mail.ru>

## v0.0.2

[compare changes](https://github.com/merkulovka/use-l5/compare/v0.0.1...v0.0.2)

### 🩹 Fixes

- Удален ненужный экспорт у useL5 ([a8a346b](https://github.com/merkulovka/use-l5/commit/a8a346b))
- Исправлены перепутанные дефолтные значения для фильтров ([4c89722](https://github.com/merkulovka/use-l5/commit/4c89722))
- Исправлены перепутанные дефолтные значения для фильтров (поправлены тесты) ([911379d](https://github.com/merkulovka/use-l5/commit/911379d))

### ❤️ Contributors

- Kirillmerkulov <kirill_tagil9@mail.ru>

