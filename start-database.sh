#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux or macOS:
# you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="mysql"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  exit 0
fi

if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  docker start "$DB_CONTAINER_NAME"
  echo "Exisiting database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# import env variables form .env
set -a
source .env

# DATABASE_URL="mysql://root:password@localhost:3306/admin-pro"
# | 管道符，将上一步执行结果传递给下一步 awk
# awk 是一种处理文本文件的语言，是一个强大的文本分析工具。https://www.runoob.com/linux/linux-comm-awk.html
# # - -F <分隔符>，-F':' '{print $3}' 指定冒号分割，打印第三个冒号分割前的字符
#
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')
DB_DATABASE=$(echo "$DATABASE_URL" | awk -F'\/' '{print $NF}'

if [ "$DB_PASSWORD" == "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[yY]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  ## tr 替换指令，将字符中出现 '+'' or '/' 替换成 '-' or '_’
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  # Write file, Replace text
  ## s/原字符串/新字符串/, 具体结构为s/原字符串/新字符串/。不过，这里使用了#作为分隔符而不是通常的/，这是为了避免在字符串中包含/时产生混淆。
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e MYSQL_ROOT_PASSWORD="$DB_PASSWORD" \
  -e MYSQL_DATABASE="$DB_DATABASE" \
  -p "$DB_PORT":3306 \
  docker.io/mysql && echo "Database container '$DB_CONTAINER_NAME' was suscessfuly created"
