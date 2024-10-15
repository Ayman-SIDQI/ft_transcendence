#!/bin/bash

cat << EOF > /etc/nginx/http.d/nginx.conf
server {
    listen 80;
    server_name localhost;  # Change this to your domain name if you have one

    root /frontend;  # Change this to the actual path of your frontend files
    index index.html;

    location / {
        try_files ${DOLLAR_SIGN}uri ${DOLLAR_SIGN}uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|json|woff|woff2|ttf|svg|eot|mp3|json|bin|gltf|txt)${DOLLAR_SIGN} {
        expires max;
        log_not_found off;
        access_log off;
        add_header Cache-Control "public, max-age=31536000";
    }

    location /static/ {
        alias /frontend/static;  # Change this to the actual path of your static files
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
        try_files ${DOLLAR_SIGN}uri =404;
    }

    # location /api/ {
    #     proxy_pass http://localhost:8080;  # Assuming your Node.js app runs on port 8080
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade ${DOLLAR_SIGN}http_upgrade;
    #     proxy_set_header Connection 'upgrade';
    #     proxy_set_header Host ${DOLLAR_SIGN}host;
    #     proxy_cache_bypass ${DOLLAR_SIGN}http_upgrade;
    # }
}
EOF
