FROM maven:3-jdk-11
EXPOSE 8080
HEALTHCHECK --interval=5m --timeout=5s --start-period=5m CMD wget -nv -t1 --spider http://localhost:8080/actuator/health || exit 1
COPY *.jar /app.jar
CMD ["java", "-jar", "-Dspring.profiles.active=prod", "-Xverify:none", "-noverify", "/app.jar"]