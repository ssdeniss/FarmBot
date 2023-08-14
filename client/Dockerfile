FROM nginx:1.19-alpine
WORKDIR /usr/share/nginx/html
EXPOSE 80
RUN rm -rf /etc/nginx/conf.d && mkdir -p /etc/nginx/conf.d
COPY .conf/ /etc/nginx/conf.d
RUN chmod +x /etc/nginx/conf.d/initconfig.sh
COPY build/ /usr/share/nginx/html
CMD ["/bin/sh", "-c", "/etc/nginx/conf.d/initconfig.sh > /usr/share/nginx/html/config.js && nginx -g \"daemon off;\""]
