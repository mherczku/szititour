# For raspy pod:
FROM balenalib/raspberry-pi-debian-openjdk:8--stretch
EXPOSE 8080/tcp
COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar docker.jar
ENTRYPOINT ["java","-jar","/docker.jar"]


# For simple pod:
#FROM openjdk:11-jdk-slim
#COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar /myapp.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "myapp.jar"]