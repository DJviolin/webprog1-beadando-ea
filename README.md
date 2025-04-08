# webprog1_beadando_ea

A kész projekt elérhető a [http://lanti.nhely.hu](http://lanti.nhely.hu) címen feladat szerint almappákba szervezve.

## Kész feladatok webszerveren

* [1. feladat](http://lanti.nhely.hu/ea_fel01/index.html)
* [2. feladat](http://lanti.nhely.hu/react/react.html)

## Teszt URL-ek (Webprogramozas-1-Előadás-Beadando-feladat.docxf fájl végén)

* [proba.txt](http://lanti.nhely.hu/proba.txt)
* [testDB.php](http://lanti.nhely.hu/testDB.php)

## Használat

### Lokális PHP szerver használata XAMPP nélkül NPM-ben fejlesztéshez

A PHP automatikusan letöltésre kerül a `./.php` mappába a `main.js` lokális webszerver indító script által (csak Windows-os verziót kezel).

### Futtatás localhost-on

A projekt monorepó struktúrát használ, vagyis minden `npm` parancsot a gyökérkönyvtárban kell futtatni.

```sh
$ npm install
```

Kód linting futtatása:

```sh
$ npm run lint
```

app1 & app2 React appok tesztelése:

```sh
$ npm run dev
```

React build futtatása:

```sh
$ npm run build
```

HTTP szerver futtatása lokális teszteléshez (build után):

```sh
$ npm start
```

Elavult NPM csomagok verzió vizsgálata:

```sh
$ npm outdated
```

## Eslint linting használata VSCode-ban Javascript-hez

A linting az `eslint` modult használja, és a konfiguráció a `eslint.config.js` fájlban van megadva monorepóként a React al-projektekre is érvényesítve (tehát azokban már nincs az `eslint` telepítve).
