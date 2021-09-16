A estrutura do programa esta separada em três camadas distintas. A primeira delas se chama Camada de Visualização e é responsável pela interação visual entre o cliente e a aplicação. É importante apontar que essa camada se comunica exclusivamente com uma outra camada mais interna que é nomeada de Camada de Controle de Requisições. Por sua vez, essa camada possui o papel de atender as demandas feitas pela camada anterior (que podem ser buscar requisições ou entregar dados). Por fim, tem-se a camada mais interna que é a Camada de Operação que é responsável pelo armazenamento dos dados e não possui comunicação com a Camada de Visualização.

O esquema do programa está disponível visivelmente abaixo:

![WhatsApp_Image_2021-05-30_at_14.55.43](/uploads/43fa244137d75bc46122ba8270a2b9d2/WhatsApp_Image_2021-05-30_at_14.55.43.jpeg)

Como apresentado na imagem, a camada de visualização possui apenas as telas para serem apresentadas aos clientes que, por sua vez, são nomeadas de acordo com o nome do componente. Ou seja, por exemplo, a tela de login esta no arquivo de nome Login.
Por sua vez, a camada de controle de requisições possui a responsabilidade de fazer a comunicação entre a camada de visualização e a camada de operação. Seus arquivos são nomeados de acordo com os da Camada de Visualização com a adição do sufixo Controller. Então, por exemplo, o componente de Login ficará responsável por atender os pedidos de seu correspondente na Camada anterior.
Por fim, a camada de operação possui a responsabilidade de coletar os dados requisitados pela Camada de Controle e requisições no banco de dados noSQL.

# PADROES DE PROJETO

Para o desenvolvimento do projeto, alguns padrões foram adotados por questões de boas práticas. Dessa forma, podemos citar:

- O uso de CamelCase iniciando com letra minúscula para a nomeação das variáveis;

- O uso de CamelCase iniciando com letra maiúscula para a nomeação dos arquivos;

- A linguagem de programação escolhida com padrão foi o JavaScript. Mais especificamente, a biblioteca React. Vale citar ainda que utilizamos CSS para estilizar o projeto;

- Optamos pela adoção do banco de dados noSQL Firebase para armazenar os dados e utilizamos os serviços de backend as service do Firebase.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) 
