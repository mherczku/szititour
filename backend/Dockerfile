
# Updated Dockerfile:

# Use a Java runtime image as the base image
FROM openjdk:11-jre-slim

# Copy the JAR file into the container
COPY build/libs/szititour-backend-0.0.2-SNAPSHOT.jar /myapp.jar

# Expose the port on which the application listens
EXPOSE 8080

# Set the command to run the application using the JAR file
CMD ["java", "-jar", "/myapp.jar"]

# The error message "image build failedundefined" most likely occurred due to the missing space between "failed" and "undefined". 
# Additionally, the exposed port should be specified without the protocol (tcp). I fixed these issues in the updated Dockerfile.
