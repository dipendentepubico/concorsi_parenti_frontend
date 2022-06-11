# Concorsi Parenti Dipendenti Frontend

A scopo statistico mostra quanti parenti fino al n grado di parentela vincono o risultano idonei nei concorsi pubblici dello stesso ente.

Backend Spring Boot  
Frontend Angular  

## Docker
### Build
La build di docker è multi stage.  
Nella prima fase usa nodejs per transpilare. Il file .npmrc è predisposto per utilizzare la variabile di ambiente NPM_TOKEN per l'autenticazione verso il repository npm.  
Nella seconda fase copia js, css e html nella directory di nginx e ascolta su 24401.  
CMD è svrascritto affinchè sostituisca i placeolder di assets/env.template.js con i valori delle variabili di ambiente generando il file assets/env.js.

```
docker build --build-arg NPM_TOKEN=AAABBBCCCTOKEN -t custom.registry:443/path/dipendentepubico/concorsiparentifrontend .
```

### Test
```
ng test --configuration=test
```
o semplicemente
```
ng test
```

### Run Docker
Nel caso non venisse passata la variabile di ambiente API_URL viene utilizzata quella di default specificata nel file environment*.ts.  
```
docker run --env API_URL="http://server:porta/"  -p 24401:80 custom.registry:443/path/dipendentepubico/concorsiparentifrontend
```
### Run Docker-Compose
In alternativa è possibile modificare e lanciare il docker-compose.yaml.
```
docker-compose up -d
```



## OpenAPI
OpenAPI JSON
http://localhost:8083/v3/api-docs/
Swagger UI
http://localhost:8083/swagger-ui.html
