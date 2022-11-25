
Raunak Mishra   

# JWT

JWT, or JSON Web Token, is an open standard used to share information between two parties securely — a client and a server. In most cases, it’s an encoded JSON containing a set of claims and a signature. It’s usually used in the context of other authentication mechanisms like OAuth, OpenID to share user-related information. It’s also a popular way to authenticate/authorize users in a microservice architecture.

 JWT authentication is a token-based stateless authentication mechanism. It is popularly used as a client-side-based stateless session, this means the server doesn’t have to completely rely on a database to save session information.

JWTs can be encrypted, but they are typically encoded & signed.  We will be focusing on Signed JWTs. The purpose of Signed JWT is not to hide the data but to ensure the authenticity of the data. And that is why it’s highly recommended to use HTTPS with Signed JWTs.

**Structure of JWT**

JWT structure is divided into three parts: header, payload, signature & is separated from each other by dot (.),

1) Header : The header consists of two parts: 
The signing algorithm being used and the type of token, which is in this case mostly “JWT”.

2) Payload : The payload usually contains the claims (user attributes) and additional data like issuer, expiration time, and audience. 

3) Signature : This is typically a hash of the header and payload sections of the JWT. The algorithm which is used to create the signature is the same algorithm mentioned in the header section of the JWT. Signature is used to validate that the JWT token wasn’t modified or changed during transit. It can also be used to validate the sender.

<!-- Here is an example which I encoded for my name on jwt.io, -->

**Benefits of JWT**

* __No database lookups__: It’s generally known that for most APIs, network calls add the most latency. Hence, it’s reasonable to expect that having no network calls (no database lookups) for session verification is beneficial.

    To prove this, I ran a test to see latency times (requests per second or RPS) of APIs that used JWTs and not. The displayed RPS are an average of running the tests 60 times. Following are the different APIs that were tested:

    * API-control: This API does nothing and can be used as a maximum RPS reference.
    * API-1a: JWT verification and response.
    * API-1b: Opaque token verification via database and response.
    * API-1c: Opaque token verification via cache and response. 

    For each API, I set up the database / cache in three locations:

    1) The same machine (as the API process)

    2) A different machine, but within the same WiFi network

    3) A different machine with a different network (to the API process). All machines have roughly the same specifications in terms of processing power and RAM.

    As it can be seen, database lookups are indeed much slower, especially over distributed machines (which is very often the case). However, there are counters to this point:

    Other services have scaled successfully without JWT: This is also true (even Facebook doesn’t use JWTs). It is possible to scale well with opaque tokens, but it’s just much more difficult and expensive to do so. JWT tokens make our work easier.

* __Saving on database space__: Since JWT’s don’t need to be stored in the database, it does save space. To get a sense of how much, let’s do some calculations:

    Opaque tokens (64 characters long), would take 64 bytes of space.
    We want to associate a userId (36 bytes) and some session information with this token (200 bytes). Overall, it takes 300 bytes of space to store one user’s session information.

    If we assume an app has a million active sessions (which is a lot), that means it’s using 300 million bytes or 300 MB for sessions. 10 million sessions? 3GB of storage.
    
    So by using JWTs, we are saving 300 MB of database space per million users. This does make much difference since it would cost dollars per month on AWS as per their pricing.

* __JWTs are easier to use__: JWTs are easier to get started with since we don’t have to take the effort to build a system that reads the database for session verification, or have a job to remove expired tokens. However, these are quite easy to implement anyway.