FROM balenalib/raspberry-pi-debian:buster
RUN apt update
RUN apt -y full-upgrade
RUN apt -yq install pigpio python-pigpio python3-pigpio wget
COPY install-java.sh /install-java.sh
RUN chmod u+x /install-java.sh && /install-java.sh
EXPOSE 8080/tcp
ENV LOG_LEVEL=debug
ENV TZ=Europe/Berlin
ENV DEMOMODE=false

COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar docker.jar

ENTRYPOINT ["java","-jar","/docker.jar"]