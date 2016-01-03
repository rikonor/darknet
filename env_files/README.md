# Secure Credentials
---

#### Example

```
# prod.env

MONGO_URL=mongodb://<user>:<pass>@<host>:<port>/<db>
AWS_KEY=<KEY>
AWS_SECRET=<SECRET>
PORT=3000
ROOT_URL=http://localhost

# etc...
```

#### How to use
In `docker-compose.yml` or `docker-compose.develop.yml`, refer to this file using `env_file`.

### Example

```
# docker-compose.yml

microsite:
    image: <image>
    ...
    env_file: ./env_files/prod.env
    ...
```
