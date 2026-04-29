FROM richarvey/nginx-php-fpm:latest

COPY . /var/www/html

ENV WEBROOT /var/www/html/public
ENV APP_TYPE php
ENV SKIP_COMPOSER 1
ENV PHP_ERRORS_STDERR 1

RUN composer install --no-dev --optimize-autoloader

EXPOSE 80