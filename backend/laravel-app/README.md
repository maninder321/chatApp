Use the following instructions to setup Backend 
1. Go to backend directory
2. Start docker container with "docker compose up -d"
3. Then attach shell on "laravel-docker" container
4. Install dependencies using "composer install"
5. Run migrations using "php artisan migrate"
6. Configure passport using "php artisan passport:install"
7. If oauth keys not defined, define them using "php artisan passport:keys"