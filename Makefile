DOCKER ?= docker
DOCKER_COMPOSE ?= docker-compose
# KUBECTL ?= kubectl


all: build

# Docker related commands
up: build-app
	$(DOCKER_COMPOSE) up -d --build

down:
	$(DOCKER_COMPOSE) down

db:
	$(DOCKER_COMPOSE) exec db createdb -U postgres food_recommendation

migrate:
	$(DOCKER_COMPOSE) exec node node_modules/.bin/sequelize db:migrate

seed:
	$(DOCKER_COMPOSE) exec node node helper.js

build-app:
	$(DOCKER) build . -t foodapi

build: build-app

# # Kubernetes related commands
# kube-build:
# 	sh ./scripts/build-images-in-minikube.sh

# kube-deploy: kube-build
# 	$(KUBECTL) apply -f deploy/

# kube-migrate:
# 	sh ./scripts/run-migrate-in-pod.sh

# kube-delete:
# 	$(KUBECTL) delete -f deploy/

# # General utilities
# clean-db:
# 	sudo rm -rf ./postgres

# clean: clean-db
# 	rm -rf node_modules npm-debug.log


# .PHONY: up, down, migrate; build-deps, build-app, build, kube-build, kube-deploy, kube-migrate, kube-delete, clean-db, clean