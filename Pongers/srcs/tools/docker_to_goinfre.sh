#!/bin/bash

RED="\033[31m"
GREEN="\033[32m"
ENDCOLOR="\033[0m"

echo -e "\n"
echo -e "		██████╗  ██████╗  ██████╗██╗  ██╗███████╗██████╗     ████████╗ ██████╗      ██████╗  ██████╗ ██╗███╗   ██╗███████╗██████╗ ███████╗	"
echo -e "		██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗    ╚══██╔══╝██╔═══██╗    ██╔════╝ ██╔═══██╗██║████╗  ██║██╔════╝██╔══██╗██╔════╝	"
echo -e "		██║  ██║██║   ██║██║     █████╔╝ █████╗  ██████╔╝       ██║   ██║   ██║    ██║  ███╗██║   ██║██║██╔██╗ ██║█████╗  ██████╔╝█████╗  	"
echo -e "		██║  ██║██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗       ██║   ██║   ██║    ██║   ██║██║   ██║██║██║╚██╗██║██╔══╝  ██╔══██╗██╔══╝  	"
echo -e "		██████╔╝╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║       ██║   ╚██████╔╝    ╚██████╔╝╚██████╔╝██║██║ ╚████║██║     ██║  ██║███████╗	"
echo -e "		╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝       ╚═╝    ╚═════╝      ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝╚═╝     ╚═╝  ╚═╝╚══════╝	"
echo -e "\n"



if [ ! -d """$HOME""/goinfre/docker" ]; then
	mkdir "$HOME"/goinfre/docker
	rm -rf "$HOME"/Library/Containers/com.docker.docker
	ln -s "$HOME"/goinfre/docker "$HOME"/Library/Containers/com.docker.docker
	echo -e "						${GREEN}-- The docker directory has been created and the cache has been cleared. --${ENDCOLOR}"
else
	echo -e "						${RED}-- The cache is already cleared and the goinfre directory exists! --${ENDCOLOR}"
fi
