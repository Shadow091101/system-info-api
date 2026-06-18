const BASE_URL = "http://localhost:9009";

async function testEndpoint(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        console.log(`✅ ${endpoint}`);
        console.log(`   Status: ${response.status}`);
    }
    catch (error) {
        console.log(`❌ ${endpoint}`);

        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
        } else {
            console.log(`   Error: ${error.message}`);
        }
    }
}

async function runTests() {

    console.log("=================================");
    console.log("Running API Tests");
    console.log("=================================\n");

    await testEndpoint("/");
    await testEndpoint("/cpu");
    await testEndpoint("/cpu-threads");
    await testEndpoint("/network-interfaces");

    console.log("\n=================================");
    console.log("Testing Complete");
    console.log("=================================");
}

runTests();
