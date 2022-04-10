#Tech Stack Reasoning

##Frontend:
We were between React Native and Angular in deciding what frontend framework we wanted to work with. In our decision, we weighed what we were each familiar working with, the online resources available to help us troubleshoot and work through any issues we may run into, and overall accessability. In the end, we decided to work with React Native because a few team members have some experience in it along with HTML, CSS, and JavaScript, which are basic knowledge required for React. React is also easier to learn than Angular and it seems to have more online resources available to help us through the development process. Plus, since React employs Component-based architecture to construct User Interface, the code in those components is elegant and easy for people to understand and can be reused conveniently whenever necessary. 

##Backend
Our decision was between using Django and Flask to host our backend server. We made our decision based on what type of database we would be using (relational or non-relational). Django is definitely a more favorable option when it comes to relational database, but it might not be really compatible with noSQL database. Since we are considering using MongoDB (which is a non-relational database) to get data of songs, corresponding artists and so on, framework Flask appears to be a more reasonable choice to work with this non-relational database over Django. (we can also add some reason why we choose to use a non-relational DB rather than relational DB)
Moreover, since Flask is framework based on programming language Python, and Python is a programming language that our group members are confident on, so it also makes sense to use Flask from this subjective standpoint.

##Connecting our frontend and backend
Our team members were successfully able to connect a React frontend to the Flask backend utilizing the following tutorial: https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i.
