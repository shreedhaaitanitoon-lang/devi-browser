#!/usr/bin/env sh
DIRNAME=$(dirname "$0")
PROGNAME=$(basename "$0")
APP_BASE_NAME=$(dirname "$0")

app_home=$(cd "$DIRNAME" && pwd)

CLASSPATH=$app_home/gradle/wrapper/gradle-wrapper.jar

exec java -Xmx64m -Xms64m -jar "$CLASSPATH" "$@"
