#!/bin/bash

echo "================================="
echo "Running API Tests"
echo "================================="

node backend/test.js

EXIT_CODE=$?
echo ""
echo "================================="
echo "Testing Complete"
echo "================================="

exit $EXIT_CODE
