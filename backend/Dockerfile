FROM openjdk:11-jdk-slim
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]


#FROM openjdk:11-jre-slim
#COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar /myapp.jar
#EXPOSE 8080
#CMD ["java", "-jar", "/myapp.jar"]