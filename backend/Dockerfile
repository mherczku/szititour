FROM balenalib/raspberry-pi-debian-openjdk:8--stretch
EXPOSE 8080/tcp
COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar docker.jar
ENTRYPOINT ["java","-jar","/docker.jar"]