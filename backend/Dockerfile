FROM openjdk:11-jdk-slim
COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar /myapp.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "myapp.jar"]