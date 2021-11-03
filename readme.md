Kill Gil Arena Brawl
=========

Hi there,\
Kill Gil is a web based, multiplayer, platformer game.

The backend is written in Nodejs and uses the Socket.io libary to handle web sockets.

The frontend uses the HTML5 canvas API.


Prerequisites:
* Nodejs

To run:
1. clone the repository
2. Install NPM dependencies
```
npm install
```
3. run the app
```
node app
```

## Challenges in making Kill Gil
The main challenge in putting together Kill Gil was designing the system to keep the ever evolving game state of all the clients accurate and uniform. To achieve this I used web sockets to allow each client to emit data to the server whenever a notable event happened, and the server broadcasts that data to the other clients. Whenever a client recieves new data from the server it updates the game state accordingly. 

## Possible improvements
The performance of the game is dependent on the server's ability to constantly receive and broadcast new game states to the clients. Most of these events are independent and could be run in parallel. Perhaps implementing a server that automatically scales based on the request load and a load balancer that directs the outgoing messages of the clients to the least utilized server would enhance performance.

From a cyber security perspective the game leaves much to be desired. Since the truth regarding the game state is determined by the clients, a malicious player could send false messages to the server manipulating the game state. A possible correction to this would be to shift more of the responsibility of determining the game state to the server. Alternatively, securely hashing the messages sent to the server to ensure authenticity would make it far more difficult for a malicious player to falsify messages. 

## Final thoughts
This project began as an excuse for me to learn how to use web sockets with NodeJs however it evolved into much more. It became an opportunity for me to think critically about game mechanics, learn how to expertly interact with the HTML5 canvas api, and how to synchronize an application across different devices and screen sizes. I also used this project to learn about hosting servers on various platforms including AWS EC2, Heroku, Glitch, Firebase, and DigitalOcean. You can play a live version of KGAB hosted on Heroku at https://kgv2.herokuapp.com/ . 

