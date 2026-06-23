#!/bin/bash

set -euo # //This is the key( makes script stop on error)

BACKEND_URL="http://host.docker.internal:9009"

echo "Testing Root Endpoint..."
curl -f $BACKEND_URL/

echo -e "\n\nTesting CPU Endpoint..."
curl -f $BACKEND_URL/cpu 

echo -e "\n\nTesting CPU Threads Endpoint..."
curl -f $BACKEND_URL/cpu-thread

echo -e "\n\nTesting Network Interfaces Endpoint..."
curl -f $BACKEND_URL/network-interfaces

echo -e "\n\nAll tests completed."