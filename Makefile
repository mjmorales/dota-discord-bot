.PHONY: serve
serve:
	docker-compose up

.PHONY: stop
stop:
	docker-compose down

.PHONY: commands
commands:
	docker-compose run --rm dota-game-tracker commands

.PHONY: build
build: 
	docker-compose build
