# SPG-WEB

![React](https://img.shields.io/badge/-react-black?style=for-the-badge&logoColor=black&logo=react&color=61DAFB)
![TypeScript](https://img.shields.io/badge/-typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6)
![MUI](https://img.shields.io/badge/-mui-black?style=for-the-badge&logoColor=white&logo=mui&color=007FFF)
![Vite](https://img.shields.io/badge/-vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF)
![Vite](https://img.shields.io/badge/-eslint-black?style=for-the-badge&logoColor=white&logo=eslint&color=4B32C3)

## 📋 Table of Contents

1. 🚀 [What is this app ?](#what-is-this-app)
2. ✨ [Main structure](#main-structure)
3. ✅ [Installation](#installation)
4. 🔨 [Build](#build-and-run)
5. 💯 [Tests](#tests)
6. ❤️ [Contributors](#contributors)

## <a name="main-structure"> 🚀 What is this app ?</a>

**Spg-web** is a web app developed to perform as the primary frontend structure for the SPG TCC project.

## <a name="main-structure">✨ Main Structure</a>

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## <a name="installation">✅ Installation</a>

To **install all dependencies** execute the following command 

```bash
  npm install
```

## <a name="build-and-run">🔨 Build and Run</a>

To **build the project** execute the following command

```bash
  npm run build
```

To **run the project** execute the following command

```bash
  npm run dev
```

## <a name="tests"> 💯 Tests</a>

Write about Tests

## <a name="contributors">❤️ Contributors</a>
- <a href="https://github.com/andrepcarraro">Andre Carraro</a>
- <a href="https://github.com/Wegxx">Giovanna Nascimento Reis</a>
- <a href="https://github.com/MateusAbu">Mateus Abu Kamel</a>
- <a href="https://github.com/PierryLeal">Pierry Leal</a>
