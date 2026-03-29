# What will be the programming language for the backend?

Javascript, using Express.JS as a framework. (easiest to get up and running)

We wanna make stuff as frontend as possible for cost reasons.

# How does the internet work?

The internet is a product of the full stack. The internet is billions of programs, billions of backends connected to one another. We can interact with them throughout a web browser

# Term: Serverside

Your experience of the web is called... the frontend. Or client side. The frontend is running on your device. The backend is running on a server.

# The cloud

The cloud is a server

# How do things go live on the internet?

A web server. Which are just a bit of programming logic and some internet functionalities, like listening for a network request.
The continuation of a web server is a database.

There are 2 main kinds of databases, 
SQL, which can be obtained via MySQL, PosgreSQL (the one we'll use) or SQLite -- it stores info in a spreadsheet. Very structured, very organized.
NoSQL: like a dictionary, e.g: firebase (favorite), mongoDB, redis 

# What is ORM? Object Relational Mapping

When we have a SQL DB, not a NoSQL, but a SQL DB, a ORM allows us to act with the database as if it were a data type, like integers, or floats, or strings or arrays.

--

So we can use progamming languages with ORM tech, like sequelize, that gives us a library of tools to use to make working with a database THAT much easier.

# How do websites talk to each other?

Via something called API. It stands for Application Programming Interface. 
It's essentially an endpoint. The last point where that photo is processed. These endpoints are usually located via a url like www.youtube.com

A way to make these APIs is via a RESTful API - this is an architecture. So, we must talk the same language or we don't understand outselves, the RESTful API tells what that language is...

Withing that RESTful API architecture we have what is known as HTTP Methods (HTTPS is just a more secure version, the methods are the critical part and they are the same)
- When we send certain network requests to different APIs we get certain responses. And the important thing here is verbs:
    - get: get information back - like sending a note to the governement office, and hoping for a response.
    - post: if you are sending information to the governament so they can process it and save it and you don't need any response back, you'd be posting that information to them. 
    ...    
It might go to the exact same office or exact same api endpoint - but the verb allows you to specify the intention of that network request.

# How do websites are kept secure - how do they know it's me coming into the website?

E.g: you're logged into youtube. E.g: Hackers are bad.

There are people out there who bug up your code for pure satisfaction, with a SQL injection. -- This is a kind of hack and preventing hacks is a big ass part of backend development.
Another hack is a DDOS attack. -- Hackers can make it seam like there is 2 million people accessing your computer, even if there isn't -- it means a humongously massive bill. We need to design measures to prevent this.
There is A LOOOOOOOOOOOOOOOOOOOOOOOOOOOT more.

(we'll have to account for this in our document.)

# What is CI/CD or continious integration / continous deployment?

How do coders ensure their code works before putting it online? That's the problem it fixes.

This is setting up a pipeline to handle the effective deployment of your code to the internet.

# Can we make websites run without traditional servers?

Yes, thanks to Cloud and Serverless. Now... it's just more servers, except they are preconfigured, to plug and play much faster... they have more processes to help you, like Cloud Functions for example... I might use AWS's cloud or serverless systems in my app, maybe I'll have to check prices first. 

# Testing & Monitoring

How do you make sure your code does what it's supposed to?

Remember: Users are EXTREMELY UNPREDICTABLE. So, a huge portion of backend programming is gonna be testing and monitoring.

There are 3 types of tests you can write, before the user touches the app:
- Unit Tests - Check specific units or code bodies
- Integration Tests check functionalities between things talking to each other.
- End to end testing is more then just "a thing" but more of a suite of tests.

Then we have monitoring our users. And we can use tech to do that.

# And then, there is more stuff we need to take care of:

- Caching
- Microservers
- Queues
- Background Processing
- Version Control
- Performance Optimization
- Documentation
- Versioning