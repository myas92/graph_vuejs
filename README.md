Start Project
## Ubuntu
```
sudo apt-get install build-essential
make
```


### Create constraints
```bash
CREATE CONSTRAINT FOR (n:Person) REQUIRE (n.personalId) IS UNIQUE
```


### Write Query
https://neo4j.com/docs/cypher-manual/current/clauses/


## Get Single Nodes
```
MATCH (a) WHERE not ((a)--()) RETURN *;
```