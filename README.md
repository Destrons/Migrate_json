# Migrate_json
 projeto de migração de dadps do tipo json para banco de dados.

Estrutura inicial: 

/migrate_json
│── backend/  (Laravel)
│   ├── app/            # Código da aplicação 
│   ├── bootstrap/      # Inicialização do framework
│   ├── config/         # Arquivos de configuração
│   ├── database/       # Migrations, Factories e Seeders
│   ├── public/         # Arquivos públicos 
│   ├── resources/      # Views Blade
│   ├── routes/         # Arquivos de rotas 
│   ├── storage/        # Logs, Cache e Uploads
│   ├── tests/          # Testes unitários e de integração
│   ├── vendor/         # Dependências instaladas pelo Composer
│   ├── .env            # Variáveis de ambiente
│   ├── artisan         # CLI do Laravel
│   ├── composer.json   # Dependências PHP
│   ├── package.json    # Dependências JS
│
│── frontend/  (React)
│   ├── public/         # Arquivos públicos 
│   ├── src/            # Código-fonte do React
│   │   ├── assets/     # Imagens, ícones, estilos globais
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── pages/      # Páginas principais do app
│   │   ├── services/   # Conexão com a API (fetch, axios)
│   │   ├── context/    # Gerenciamento de estado (Context API)
│   │   ├── hooks/      # Hooks personalizados
│   │   ├── App.jsx     # Componente principal
│   │   ├── main.jsx    # Ponto de entrada do React
│   ├── .env            # Variáveis de ambiente
│   ├── package.json    # Dependências do projeto
│   ├── vite.config.js  # Configuração do Vite