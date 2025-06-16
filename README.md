# ☀️ UVBuddy - Monitor de Índice UV

UVBuddy é uma aplicação web moderna, construída com Next.js, que permite monitorar o índice UV atual e visualizar seu histórico recente. O objetivo é fornecer informações claras e dicas de proteção para ajudar os usuários a se protegerem da radiação UV.

## ✨ Funcionalidades

* **Monitoramento em Tempo Real:** Exibe o índice UV atual com um indicador visual intuitivo (cores e texto de nível: Baixo, Moderado, Alto, Muito Alto, Extremo).
* **Gráfico de Histórico:** Apresenta um gráfico interativo do índice UV da última hora, utilizando Recharts, para que os usuários possam observar tendências.
* **Dicas de Proteção:** Oferece sugestões importantes de como se proteger do sol com base no nível UV.
* **Atualização Automática:** Os dados são atualizados a cada 10 minutos para garantir informações recentes.
* **Design Responsivo:** Construído com Tailwind CSS para garantir uma experiência de usuário agradável em diferentes dispositivos.

## 🚀 Primeiros Passos

Para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18.18.0 ou superior) e um gerenciador de pacotes como `npm`, `yarn`, `pnpm` ou `bun` instalados.

### Instalação

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/alehholiveira/uvbuddy.git](https://github.com/alehholiveira/uvbuddy.git)
    cd uvbuddy
    ```
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    # ou
    bun install
    ```

### Executando o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento com hot-reloading:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra (http://localhost:3000) no seu navegador para ver a aplicação em funcionamento. A página será atualizada automaticamente conforme você edita os arquivos.

`Nota`: Esta aplicação front-end consome dados de um servidor backend. Para que os dados sejam exibidos corretamente, você precisará ter o backend em execução. O projeto do backend está disponível em: (https://github.com/alehholiveira/apinode). A aplicação front-end espera que o backend esteja acessível em (http://localhost:3333).
