#!/bin/sh
set -e

nginx
exec pm2 start process.json --no-daemon
