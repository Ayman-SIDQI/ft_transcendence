FROM alpine:3.18

ARG DOLLAR_SIGN

WORKDIR /frontend

RUN apk update && apk upgrade && apk add --no-cache nginx

COPY frontend/conf/nginx_script_conf.sh /frontend/

RUN chmod 777 nginx_script_conf.sh && sh nginx_script_conf.sh

CMD ["nginx", "-g", "daemon off;"]
