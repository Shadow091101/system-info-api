#!/bin/bash

ste -e # //This is the key( makes script stop on error)

BACKEND_URL="http://host.docker.internal:9009"

echo "Testing Root Endpoint..."
curl -f $BACKEND_URL/ || exit 1

echo -e "\n\nTesting CPU Endpoint..."
curl -f $BACKEND_URL/cpu || exit 1

echo -e "\n\nTesting CPU Threads Endpoint..."
curl -f $BACKEND_URL/cpu-threads || exit 1

echo -e "\n\nTesting Network Interfaces Endpoint..."
curl -f $BACKEND_URL/network-interfaces || exit 1

echo -e "\n\nAll tests completed."