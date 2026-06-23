const BASE_URL = "http://host.docker.internal:9009";

let failed=false;

async function testEndpoint(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        const result=await response.json()
        if (response.status === 200) {
            console.log(`✅ ${endpoint}`);
            console.log(`   Status: ${response.status}`);
            console.log(result)
        } else {
            // Server responded, but with an error status (404, 500, etc.)
            console.log(`❌ ${endpoint}`);
            console.log(`   Unexpected Status: ${response.status}`);
            failed = true;
        }
    }
    catch (error) {
           console.log(`❌ ${endpoint}`);
        console.log(`   Error: ${error.message}`);
        failed = true;
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

    if (failed) {
        console.log("\nRESULT: ❌ One or more endpoints failed.");
        process.exit(1); // <-- THIS is what Jenkins reads as "failure"
    } else {
        console.log("\nRESULT: ✅ All endpoints healthy.");
        process.exit(0); // <-- explicit success
    }
}

runTests();
