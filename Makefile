.PHONY: build
build: docker-compose build

.PHONY: serve
serve:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

.PHONY: commands
commands:
	docker-compose run --rm dota-game-tracker commands
