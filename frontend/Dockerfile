FROM arm32v6/nginx:alpine

EXPOSE 8080/tcp
ENV LOG_LEVEL=debug
ENV TZ=Europe/Berlin
ENV DEMOMODE=false
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/szititour /usr/share/nginx/html
