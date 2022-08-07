.PHONY: serve
serve:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

.PHONY: restart
restart:
	docker-compose restart

.PHONY: commands
commands:
	docker-compose run --rm dota-game-tracker commands

.PHONY: build
build: 
	docker-compose build

.PHONY: config
config: 
	cp config.json.example config.json
