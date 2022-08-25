FROM openjdk:8-jdk-alpine

# Add Maintainer Info
LABEL maintainer="luiferma@espol.edu.ec"

# Add a volume pointing to /tmp
VOLUME /proyecto

# Add the application's jar to the container
ADD /target/*.jar app.jar

# Run the jar file
RUN apk add xfce4
 
ENTRYPOINT ["java","-Djava.awt.headless=true","-DSERVER_PORT=${SERVER_PORT}","-DPROFILE:${PROFILE}","-jar","/app.jar"]