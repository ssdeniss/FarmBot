#!/bin/bash

# ANSI escape code for text color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # No Color

# default restart all or [cont1, cont2, cont3, ...]
# -up stop and rm and compose up all or [cont1, cont2, cont3, ...]
# -stop all or [cont1, cont2, cont3, ...]
# -restart all or [cont1, cont2, cont3, ...]
# -l show logs of all or [cont1, cont2, cont3, ...] in same terminal (!recomended to use only with one parameter)
# - force befor main script remove everething from docker

if [ ! -f "run.config" ]; then
   echo -e "${YELLOW}INFO:${NC} | 'run.config' file not found"	
   touch run.config
   chmod a+rw run.config
   # Define the text to be added
   config_text="#\n# ### DEFAULT CONFIGURATION ###\n\n# directory=<pwd>\n# containers=gateway, postgres, auth, backend\n\n# ###                       ###\n\n# MAKE YOUR CUSTOM CONFIG:"
   # Append the text to run.config
   echo -e "$config_text" >> run.config
   echo -e "${GREEN}INFO:${NC} | default 'run.config' file was created in same directory."	
fi


# Change direction
directory=$(grep -E "^\s*directory=" run.config | grep -vE "^#" | cut -d '=' -f 2)
if [ -z "$directory" ]; then
    # If directory is not found, set it to the current working directory (pwd)
    directory=$(pwd)
fi

cd "$directory" || {
    echo -e "${RED} ->${NC} Failed to change to directory ${YELLOW}'$directory'${NC}. Exiting script."
    exit 1
}

# Initialize arrays to store functions and parameters
functions=()
params=()


# Function to check if a container is running
is_container_running() {
    local container="$1"
    if echo "$running_containers" | grep -qE "^${container}$"; then
        return 0 # Container is running
    else
        return 1 # Container is not running
    fi
}


# Function to launch a container from a Docker Compose file
launch_container() {
	container="$1"
	if echo "$all_containers" | grep -qE $container; then
		echo -e "${YELLOW}(Restarting)${NC} container:${BLUE} $container ${NC} "
		docker restart "$container"
	else
    		echo -e "${GREEN}(Launching)${NC} container from Docker Compose files:${BLUE} $container ${NC} "
    		docker-compose up -d "$container"  
	fi
}

stop_container(){
	container="$1"
    	echo -e "${YELLOW}(Stopping)${NC} container from Docker:${BLUE} $container ${NC} "
    	echo -ne "${RED}(Stoped) -> ${NC}"
    	docker stop "$container"  
}


reload_container() {
	container="$1"
	stop_container "$container"
   
    	echo -e "${YELLOW}(Removing)${NC} container from Docker:${BLUE} $container ${NC} "
    	echo -ne "${RED}(Removed) -> ${NC}"
    	docker rm "$container"  
    	echo -e "${GREEN}(Launching)${NC} container from Docker:${BLUE} $container ${NC} "
    	echo -ne "${GREEN}(Docker Response) -> ${NC}"
    	docker-compose up -d "$container"	
}



default(){
	container="$1"
	if is_container_running "$container"; then
		echo -e "${GREEN} -> ${NC}The container${BLUE} $container ${NC}is up and running. ${GREEN}(skiped)${NC}"
	else
		launch_container "$container"
	fi
}



run(){
# Loop through the list and display each element
	local list=("$@")
	for container in "${list[@]}"; do
		if [[ " ${functions[@]} " =~ " -stop " ]]; then
		    stop_container "$container"
		elif [[ " ${functions[@]} " =~ " -up " ]]; then
		    reload_container "$container"
		elif [[ " ${functions[@]} " =~ " -restart " ]]; then
		    launch_container "$container"
		else
		    default "$container"
		fi
		
		if [[ " ${functions[@]} " =~ " -l " ]]; then
		    exec zsh -ic "docker logs -f $container"
		fi

	done
}


while [[ $# -gt 0 ]]; do
    if [[ $1 == -* ]]; then
        # Parameter is a function (prefixed with -)
        functions+=("$1")
    else
        # Parameter is a regular parameter
        params+=("$1")
    fi
    shift
done


if [[ " ${functions[@]} " =~ " -force " ]]; then
  echo -e "\033[H\033[2J"
  if [ "$(docker ps -q)" ]; then
    echo -e "${YELLOW}(PREPARING...)${NC} clean space"
    docker stop $(docker ps -q)
  fi
  if [ "$(docker ps -qa)" ]; then
    echo -e "${RED}(CLEANING...)${NC} docker memory"
    docker rm $(docker ps -qa)
    echo -e "${GREEN}(DONE)${NC} docker memory clear"
  else
    echo -e "${GREEN}Docker memory clear${NC}"
    echo ""
  fi
fi


# Define the list
if grep -qE "^\s*containers=" run.config; then
    containers_string=$(grep -E "^\s*containers=" run.config | cut -d '=' -f 2)
    IFS=',' read -ra container_names <<< "$containers_string"
    critical_containers=("${container_names[@]// /}") 
else
    critical_containers=("gateway" "postgres" "files" "auth"  "backend")
fi
running_containers=$(docker ps --format '{{.Names}}')
all_containers=$(docker ps -a --format '{{.Names}}')

 
if [[ "${#params[@]}" -gt 0 ]]; then
	run "${params[@]}"
elif [[ " ${functions[@]} " =~ " -stop " ]]; then
	docker stop $(docker ps -q)
else 
	run "${critical_containers[@]}"
fi








