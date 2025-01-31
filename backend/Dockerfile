# Usa a imagem do PHP com Apache
FROM php:8.2-apache

# Instala extensões e dependências
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip unzip git curl \
    && docker-php-ext-install pdo pdo_mysql gd

# Habilita o mod_rewrite do Apache
RUN a2enmod rewrite

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos do Laravel para dentro do container
COPY . .

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala as dependências do Laravel
RUN composer install --no-dev --optimize-autoloader

# Permissões para o storage e cache
RUN chmod -R 777 storage bootstrap/cache

# Expõe a porta 80
EXPOSE 80

# Comando de inicialização
CMD ["apache2-foreground"]
