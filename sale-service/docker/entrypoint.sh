#!/bin/bash

cd ./sale-service || exit

if [ ! -f "vendor/autoload.php" ]; then
    composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader
    composer update
    echo "Composer install completed!"
fi

if [ ! -f ".env.production" ]; then
    cp .env.example .env.production
    echo "Copying .env.example to .env.production"
fi

## Configure Laravel
php artisan key:generate --env=production --force
php artisan migrate --env=production --force
php artisan optimize:clear
echo "Laravel configuration completed!"

php-fpm -D
nginx -g "daemon off;"
