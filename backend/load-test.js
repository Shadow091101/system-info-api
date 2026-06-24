import http from 'k6/http';
import { check } from 'k6';

export const options={
    vus:10,// 10 virtual users
    duration: '10s'
};
//k6 automatically looks for this variaable "options" once it starts the test, you should always create this variable.

//when k6 runs it internally does something like:-1) read options, conf test, start virtual users, run default function

//so here options would be like a configure object.

//vus:10 , virtual users, like user1,user2 and so on, all these virtual users are hitting the API simulatneously
//duration :'10s', means keep those no. of users running for 10 seconds.

export default function(){
    const res=http.get('http://localhost:9009/cpu')//every virtual users would hit this , response stored in res

    check(res,{
        'status is 200':(r)=>r.status===200,
    });
    //check->let us validate responses.
    //have logic like if res.status ==200 then pass else fail
}

//the above function is a special type of function,
//k6 automatically executes this fucntion repeatedly.
// we dont call it.
// k6 calls it.

// It is like, Start user1 run default function, Start user2 run default function and so on.



//After one check or by the foll i can say my API can handle  the foll

// 1. 31120 request were sent in that 10sec span
// 2. 0 request failed
// 3. Api handled everything correctly
// 4. This means that /cpu endpoint is stable   under load
// 5. /cpu API handled 3100 req per second.(very strong)
// 6. Response Time :- avg =3.11ms, 95% req<6ms, worst case= 53ms






