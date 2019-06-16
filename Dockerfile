FROM node:8
MAINTAINER Nitin Goyal <nitingoyal.dev@gmail.com>

ENV NGINX_CODENAME stretch
ENV STORE_PORT 3000

# install requirements and NGINX
RUN echo "deb http://nginx.org/packages/debian/ ${NGINX_CODENAME} nginx" >> /etc/apt/sources.list \
	&& apt-get update && apt-get install --no-install-recommends --no-install-suggests -y --force-yes \
		gettext-base\
		bash \
		zip \
		unzip \
		wget \
		curl \
		nano \
		ca-certificates \
		nginx

# install PM2
RUN npm install pm2 -g


RUN mkdir -p /var/www/cezerin2-store 

WORKDIR /var/www/cezerin2-store 

COPY . /var/www/cezerin2-store 

# Nginx config
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf.template /etc/nginx/conf.d/

# script to run Nginx and PM2
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x "/usr/local/bin/docker-entrypoint.sh"

# build project
RUN cd /var/www/cezerin2-store \
	&& npm install \
	&& npm run build


EXPOSE 80

# start Nginx, PM2
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
