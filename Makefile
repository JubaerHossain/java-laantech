.PHONY: build up down clean test logs run

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down -v
	docker system prune -f

test:
	cd product-service && ./mvnw test

logs:
	docker-compose logs -f

restart: down up

dev:
	docker-compose up

status:
	docker-compose ps
run:
	cd product-service && ./mvnw spring-boot:run

