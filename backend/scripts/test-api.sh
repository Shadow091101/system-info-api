#!/bin/bash

BACKEND_URL="http://host.docker.internal:9009"

echo "Testing Root Endpoint..."
curl $BACKEND_URL/

echo -e "\n\nTesting CPU Endpoint..."
curl $BACKEND_URL/cpu

echo -e "\n\nTesting CPU Threads Endpoint..."
curl $BACKEND_URL/cpu-threads

echo -e "\n\nTesting Network Interfaces Endpoint..."
curl $BACKEND_URL/network-interfaces

echo -e "\n\nAll tests completed."