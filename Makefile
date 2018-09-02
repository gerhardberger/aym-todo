help: ## Show this help
	@echo "Targets:"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\(.*\):.*##[ \t]*/    \1 ## /' | sort | column -t -s '##'
	@echo

up: ##Starts docker-compose
	docker-compose up

upd: ##Starts docker-compose in daemon mode
	docker-compose up -d

stop: ##Stops docker-compose
	docker-compose stop

down: ##Destroys all ps containers
	docker-compose down

sh: ##Starts a bash shell in service container
	docker exec -it aym-todo-app bash

logs: ##Shows logs of service
	docker logs aym-todo-app

logst: ##Tails logs of service
	docker logs -f aym-todo-app

unit: ##Runs unit tests
	docker exec -it aym-todo-app npm run unit

unit-hot: ##Runs unit tests
	docker exec -it aym-todo-app npm run unit:hot

test: ##Runs all tests
	docker exec -it aym-todo-app npm run test

provision: ##Provision environment
	docker exec -it aym-todo-app npm run provision:db
