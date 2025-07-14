#!/bin/bash

set -e  
directory=$(pwd)
bash $directory/scripts/run.sh
wait-port http://:8077/health/started -t 60000
wait-port http://:5001/api -t 60000



echo "everything is running."
