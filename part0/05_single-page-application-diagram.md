```mermaid
sequenceDiagram
    participant browser
    participant server
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->> browser: text/html document
    deactivate server
    
    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->> browser: text/css (style file)
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->> browser: application/javascript (javascript file)
    deactivate server

    browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: application/json (json file)
    deactivate server

    Note right to browser: After receiving json.data browser renders the content in the window
```