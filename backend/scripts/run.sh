#!/bin/bash

directory=$(pwd)

# Check if the environment file exists
ENV_FILE="$directory/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: .env file not found!"
    exit 1
fi

# Read values from the environment file
source "$ENV_FILE"

NETWORK_NAME="public-dashboard"
docker network create --attachable "$NETWORK_NAME"

bash "$directory/scripts/generate.keycloak.conf.sh"

mkdir -p $directory/docker/data
mkdir -p $directory/docker/keycloak-postgres

echo "🚀 Starting services with Docker Compose..."
docker compose --env-file "$ENV_FILE" -f "$directory/docker/docker-compose.yml" up -d --build

echo "✅ All services are up and running!"
