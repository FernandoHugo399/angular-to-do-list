# Angular To Do List

Este projeto se trata de uma **lista de tarefas simples**. É um aprimoramento de outra [lista de tarefas](https://github.com/FernandoHugo399/simple-to-do-list) que utilizou ferramentas como **HTML**, **CSS** e **JavaScript**. Além dessas ferramentas, também foi utilizado o framework **Angular** integrado as ferramentas de nuvem do **Firebase**. Possui um nível de complexidade maior que seu projeto antecessor, e feito para pessoas iniciantes/intermediárias praticarem ferramentas atuais para o desenvolvimento Web.

Possui ao todo 3 páginas: **home**, **login** e **cadastro**. As páginas de Login e Cadastro estão fazem a criação e autenticação do usuário na aplicação. Já a página home realiza operações CRUD de tarefas. Todas essas operações estão relacionadas ao serviços em nuvem do firebase.

Diferentemente da versão simplificada com HTML, CSS e JavaScript, esta aplicação precisa de mais passos para ser executada.
## Passos para executar o programa

1. Faça a instalação do **NodeJS** em sua máquina.
2. Use um terminal ou IDE e navegue até a página raiz do projeto.
3. Use o comando `npm install` para instalar as dependências do projeto.
4. Configura o ambiente firebase, especificamente os serviços **Authentication** e **Firestore Database**.
5. Preencha as credenciais de sua aplicação firebase no arquivo **src/environments/enviroments.ts**.
6. Por fim, use o comando `npm start` para iniciar a aplicação.

```ts
export const environment = {
    production: false,
    firebase: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    }
};
```


## Páginas
### Página de login
![Login](https://github.com/user-attachments/assets/58949c2d-8660-4582-889c-8af7e9720d81)

### Página de cadastro
![Cadastro](https://github.com/user-attachments/assets/901ec01e-fcd9-4352-95a0-8c474783661a)

### Página principal
![Home 1](https://github.com/user-attachments/assets/c63e305f-3d6a-4923-911f-12fd627da434)

![Home 2](https://github.com/user-attachments/assets/57645b8f-1705-4e80-9a82-82ed8b15c67c)

## Ferramentas
<p>
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html">
   <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css">
   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="javascript">
</p>

## Adicionais
- A branch **master** contém a versão final da aplicação;
- A branch **comentarios** apresenta a versão comentada da aplicação;
- Você pode utilizar este projeto para **qualquer finalidade**.
