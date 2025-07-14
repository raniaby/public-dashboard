#!/bin/bash

directory=$(pwd)

# Check if the environment file exists
ENV_FILE="$directory/.env"
if [ ! -f "$ENV_FILE" ]; then
    echo "Error: Environment file '$ENV_FILE' not found!"
    exit 1
fi

# Read values from the environment file
source "$ENV_FILE"

# Init Config
DB_USER="${KEYCLOAK_CUSTOM_DB_USER}"
DB_PASSWORD="${KEYCLOAK_CUSTOM_DB_PASSWORD}"
DB_TYPE="${KEYCLOAK_CUSTOM_DB_TYPE}"
DB_URL="jdbc:postgresql://${API_LOCALHOST}:${KEYCLOAK_CUSTOM_DB_PORT}/${KEYCLOAK_CUSTOM_DB_NAME}"
HEALTH_ENABLED="${KEYCLOAK_CUSTOM_HEALTH_ENABLED}"
METRICS_ENABLED="${KEYCLOAK_CUSTOM_METRICS_ENABLED}"
KC_LOG="${KEYCLOAK_CUSTOM_LOG}"
KC_LOG_CONSOLE_COLOR="${KEYCLOAK_CUSTOM_LOG_CONSOLE_COLOR_ENABLED}"
KC_HOSTNAME_STRICT_HTTPS="${KEYCLOAK_CUSTOM_HOSTNAME_STRICT_HTTPS}"

# Create the configuration file
CONF_FILE="$directory/docker/${DOCKER_KC_CONFIG_FOLDER}/keycloak.conf"

# Delete Conf File If Exists
rm -f $CONF_FILE

# Create New Conf File
touch $CONF_FILE

# Append Data To Conf File
echo "# Generated Config File For Keycloak" >> "$CONF_FILE"
echo "db=$DB_TYPE" >> "$CONF_FILE"
echo "db-username=$DB_USER" >> "$CONF_FILE"
echo "db-password=$DB_PASSWORD" >> "$CONF_FILE"
echo "db-url=$DB_URL" >> "$CONF_FILE"
echo "health-enabled=$HEALTH_ENABLED" >> "$CONF_FILE"
echo "metrics-enabled=$METRICS_ENABLED" >> "$CONF_FILE"
echo "log=$KC_LOG" >> "$CONF_FILE"
echo "log-console-color=$KC_LOG_CONSOLE_COLOR" >> "$CONF_FILE"
echo "transaction-xa-enabled=true" >> "$CONF_FILE"
echo "hostname-strict-https=$KC_HOSTNAME_STRICT_HTTPS" >> "$CONF_FILE"
echo "proxy=edge" >> "$CONF_FILE"
echo "proxy-address-forwarding=true" >> "$CONF_FILE"

# Success Message
echo "Configuration file '$CONF_FILE' generated successfully."
