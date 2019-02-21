# Getting Started with Docker

* [Docker](#docker)

## Docker Local

`cezerin2` is required to run this.

1. Build Cezerin2-store local
```shell
docker build \
-t cezerin2-store \
.
```

2. Run Cezerin2-store
```shell
docker run -d \
--name cezerin2-store \
--link cezerin2:cezerin2 \
-p 3000:80 \
-e API_BASE_URL=http://cezerin2/api/v1 \
-e AJAX_BASE_URL=http://cezerin2/ajax \
cezerin2-store
```
