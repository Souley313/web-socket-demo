

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# WebSocket Demo

This project is a simple WebSocket demo. It focusses on showing the basic mechanisms used to create a bidirectional (full duplex) communication WebSocket.

The application is a simple group chat, where any connected client receives messages sent by everyone. There is no [Same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) control and security involved.

The application code is two-folded: the server code and the client code.

                    ---------------------------------------------------------------------

Ce projet est une simple démonstration de WebSocket. Il présente principalement les mécanismes de base utilisés pour créer une WebSocket de communication bidirectionnelle (duplex intégral).

L'application est une simple discussion de groupe, où tout client connecté reçoit les messages envoyés par tout le monde. Il n'y a pas de contrôle de stratégie ni de sécurité.

Le code de l'application est double: le code du serveur et le code du client.

## The server

In development mode two server are used. One for the static contents of the Web app (html, js, css) and one for the WeBSocket management. The Websocket server uses the basic `http` project plus the  [ws](https://einaros.github.io/ws/) WebSocket implementation.

The WebSocket server is created atop an HTTP server on a different port than the static assets  (html, css, js files) server from Webpack. The Webpack dev server is configured to proxy the WebSocket requests to the WS server.  

What the WS server does is :

- Create an HTTP server
- Create a WebSocket Server and bind it to the HTTP server
- The WebSocket server will maintain a list of connected  WebSocket clients
- Greet any new connection
- Wait for messages from any client and broadcast the message to all the connected clients.

What the static assets server does is :

- serve static assets (html, css, images, js files)
- proxy the WS requests to the WS server

                    ---------------------------------------------------------------------

En mode développement, deux serveurs sont utilisés. Un pour le contenu statique de l'application Web (html, js, css) et un pour la gestion de WeBSocket. Le serveur Websocket utilise le projet `http` de base plus l'implémentation WebSocket [ws](https://einaros.github.io/ws/).

Le serveur WebSocket est créé sur un serveur HTTP sur un port différent de celui du serveur d'actifs statiques (fichiers html, css, js) de Webpack. Le serveur de développement Webpack est configuré pour envoyer par proxy les demandes WebSocket au serveur WS.

Ce que fait le serveur WS, c'est:

- Créer un serveur HTTP
- Créer un serveur WebSocket et le lier au serveur HTTP
- Le serveur WebSocket maintiendra une liste de clients WebSocket connectés.
- Saluer toute nouvelle connexion
- Attendre les messages d'un client et les diffuser à tous les clients connectés.

Ce que fait le serveur d'actifs statiques est:

- servir des actifs statiques (html, css, images, fichiers js)
- envoyer les demandes WS sur le serveur WS

## The client

The client uses the default implementation of the WebSocket standard that is implemented on the browser (good overall support).

What the client does:

- Retrieve a client name from the cookies
- If the name does not exist, then create a new random one.
- Create a WebSocket connection to the server and wait for messages
- On receiving a message, an `<li>` element is created with the content of the message and added to the page
- When text is entered in a form input on the page, and the return key is stroke, the text of the input field is send through the WebSocket, to the server.

                    ---------------------------------------------------------------------

Le client utilise l'implémentation par défaut de la norme WebSocket qui est implémentée sur le navigateur (bon support global).

Ce que fait le client:

- Récupérer un nom de client à partir des cookies
- Si le nom n'existe pas, créez un nouveau nom aléatoire.
- Créez une connexion WebSocket sur le serveur et attendez les messages.
- A la réception d'un message, un élément `<li>` est créé avec le contenu du message et ajouté à la page
- Lorsque le texte est entré dans un formulaire de la page et que la clé de retour est un trait, le texte du champ de saisie est envoyé par le WebSocket au serveur.                    
                    

## Analysis

This application is a very basic group chat with very little control and no security. The aim here is to show that a very few number of lines of code can already provide great communication facilities.

A more robust application would use a third party library that would take care of security, protocol mismatches and browser support. [Socket.io](http:socket.io) is one of the most achieved projects for WebSockets.

                    ---------------------------------------------------------------------
                    
Cette application est une discussion de groupe très basique avec très peu de contrôle et aucune sécurité. L’objectif ici est de montrer qu’un très petit nombre de lignes de code peut déjà fournir de grandes facilités de communication.

Une application plus robuste utiliserait une bibliothèque tierce qui prendrait en charge la sécurité, les incompatibilités de protocole et le support du navigateur. [Socket.io](http:socket.io) est l’un des projets les plus aboutis pour WebSockets.
