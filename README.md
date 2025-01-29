# Migrate_json
 projeto de migração de dadps do tipo json para banco de dados.

Estrutura inicial: 

backend-laravel/
├── app/
│   ├── Http/Controllers/  # Controladores da API
│   ├── Models/            # Modelos Eloquent
├── database/
│   ├── migrations/        # Arquivos de migração do banco
│   ├── seeders/           # Seeders para popular o banco
├── routes/
│   ├── api.php            # Rotas da API
├── config/                # Configurações do Laravel
├── .env                   # Configurações do ambiente
├── composer.json          # Dependências do Laravel
├── artisan                # CLI do Laravel


frontend-react/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas do projeto
│   ├── services/          # Conexão com a API do Laravel
│   ├── App.js             # Arquivo principal
├── public/                # Arquivos estáticos
├── package.json           # Dependências do React
├── .env                   # Configurações do ambiente
├── index.js               # Ponto de entrada
