# Docker Commands

```powershell
docker build -t flecheria/microserviceposts:0.0.1 -f posts.Dockerfile ./
docker run flecheria/microservice-posts
docker run -it flecheria/microservice-posts sh
docker exec -it <container id> sh
docker logs <container id>
```
