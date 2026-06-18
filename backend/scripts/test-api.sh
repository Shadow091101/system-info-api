#!/bin/bash

echo "Testing Root Endpoint..."
curl http://localhost:9009/

echo -e "\n\nTesting CPU Endpoint..."
curl http://localhost:9009/cpu

echo -e "\n\nTesting CPU Threads Endpoint..."
curl http://localhost:9009/cpu-threads

echo -e "\n\nTesting Network Interfaces Endpoint..."
curl http://localhost:9009/network-interfaces

echo -e "\n\nAll tests completed."