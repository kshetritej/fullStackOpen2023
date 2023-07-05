```mermaid
sequenceDiagram
    participant browser
    participant server
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new-note
    activate server
    server -->> browser: text/html Document
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server -->> browser: text/html Document
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: text/css (the css file)
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server -->> browser: application/javascript (the js file)
    deactivate server

    Note right of browser: When browser get the js file it starts executing it when it finds the JSON file then for JSON file it again sends request.

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: application/json (the json file with the content)
    deactivate server

    Note right of browser: The browser call the function(callback function) from the js file which renders the content in the browser