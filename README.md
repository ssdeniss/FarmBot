### 🚀 Farm Bot Project:

Welcome to the Farm Bot project! This project is a software-hardware REST application designed to run on a Raspberry Pi using Docker. It provides a set of services for various functionalities related to farming.

---

### 📝 OVERVIEW

The Farm Bot project consists of several services, each serving a specific purpose. These services are orchestrated using Docker Compose. Here's a brief overview of the services:

    <gateway>  : This service acts as a gateway and is responsible for routing requests to other services. It exposes ports 15000 and 18000.
    <postgres> : This service uses the latest PostgreSQL image to provide a database for the project. It is exposed on port 5432 and uses a volume named postgres_data to persist data.
    <auth>     : The authentication service handles user authentication. It is exposed on ports 15001 and 18001 and depends on the postgres service for its database.
    <backend>  : The backend service handles core functionality and interacts with the database. Exposed on ports 15004 and 18004, it also relies on the postgres service.
    <files>    : The files service allow storing, and extracting any kind of files.
    <hardware> : The hardware service allow sending messages to Arduino or other pins conected to current RaspberryPi.
    <client>   : The client service run on client machine and represent frontend part of the application. | NOTE. on development build runs on developer machine NOT DOCKER !

-> Servicecore
allow using: hibernate, JWT sequrity, FeignClients, JPA Specifications and Datasource, Password unidirictional encription.

<!> see docker-compose file for more

---

### 🔥 GETTING STARTED

To start the Farm Bot project, you'll need to follow these steps:

-> Clone the Repository: Clone this repository to your Raspberry Pi or development environment.
-> Ensure you have Docker and Docker Compose installed on your Raspberry Pi.
-> Configuration:

-> Edit the .env file to configure environment variables used by the services (such as database credentials).
-> Make sure the paths in the volumes sections of the Docker Compose file match your system paths.

-> Running the Project:
_ Open a terminal and navigate to the project directory.
_ Make shure that have permission: sudo chmod +x run.sh
_ Configure "run.config" if needed
_ Run the "./run.sh" script with appropriate parameters to manage the services:
-up: Stop and remove containers, then bring them up.
-stop: Stop containers.
-restart: Restart containers.
-l: View logs of services.
-force: Clean docker images and restart everething.

### 💡 Examples

      default run: sudo ./run.sh
      clean   run: sudo ./run.sh -up  | or use -force
      custom  run: sudo ./run.sh -restart backend auth (or any other services | functions)

---

<p><!> Use service names (e.g., gateway, auth) to target specific services.</p>

<!> Accessing Services:
Once the services are up, you can access them via the exposed ports on your Raspberry Pi.
For example, the gateway service can be accessed at http://<your_pi_ip>:18000. => ATENTION => set that in .env as REACT_APP_API_BACKEND_URL

Development and Customization
If you'd like to customize or extend the Farm Bot project, you can follow these steps:
Service Development: Each service is defined in its respective directory (e.g., gateway, auth). You can make changes to the source code, application.yml, configuration, and Dockerfile in these directories.

    node: v16.17.1
    npm: v6.10.2

---

### 🔨 BUILD && RUN

After making changes, you can rebuild and run the services using the provided scripts or Docker commands.
Remember to update the relevant environment variables and configuration files as needed.
The project is set up with Maven <3.6.3> for building and running tests. You can modify the tests as necessary and run them using Maven commands.

---

### ✏️ OPEN SOURCE && AUTHORS

GIT:

<p>
George Postica -> <a href="https://github.com/GeorgePostica/farmBot.git">https://github.com/GeorgePostica/farmBot.git</a>
</p>
<p>
Șeremet Denis -> <a href="https://github.com/ssdeniss/farmBot.git">https://github.com/ssdeniss/farmBot.git</a>
</p>

### 🔒️ LICENSE

<p>
The Farm Bot project is licensed under the MIT License.
</p>
---
