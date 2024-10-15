all: build

build:
	./srcs/tools/docker_to_goinfre.sh
	docker-compose -f srcs/docker-compose.yml up -d --build

down:
	docker-compose -f srcs/docker-compose.yml down

nginx: down
	docker-compose -f srcs/docker-compose.yml --profile nginx up -d --build

vite: down
	docker-compose -f srcs/docker-compose.yml --profile vite up -d --build


re: down build

fclean: down
	docker system prune -f -a --volumes
	docker volume prune -f
	docker rm --force $$(docker ps -qa)
