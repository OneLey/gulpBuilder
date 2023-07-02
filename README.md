# Простой сборщик проекта Gulp

Данный сборщик сжимает файлы javascript и css

Каталоги для размещения файлов стилей и скриптов
======

    Стили ./src/styles/**/*.less
    Скрипты ./src/scripts/**/*.js

Католог готовыых файлов
======
    Стили ./dist/css/main.min.css
    Скрипты ./dist/js/main.min.js

Npm пакеты
======

[gulp](https://gulpjs.com/) - сам сборщик  
[gulp-less](https://www.npmjs.com/package/gulp-less) - компиляция less файлов  
[gulp-rename](https://www.npmjs.com/package/gulp-rename) - переименовывание файлов  
[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - минификация и оптимизация CSS файлов  
[del 6.0.0](https://www.npmjs.com/package/del) - удаление каталогов и файлов  
[gulp-babel](https://www.npmjs.com/package/gulp-babel) - адаптация кода для старых браузеров  
[gulp-concat](https://www.npmjs.com/package/gulp-concat) - объединение нескольких скриптов в один  
[@babel/core](https://www.npmjs.com/package/@babel/core) - ядро нужное для корректной работы Babel  
[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - пресет babel, нужное для корректной работы Babel  
[gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - показывает файлы несжатого типа в инструментах разработчика вместо сжатого css  
[gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - добавляет CSS стили для разных браузеров

Автор
======

Автором данного сборщика является [Ismail Useinov](https://github.com/morphIsmail)
