# Microservice with NodeJS

This a test project for making microservices with NodeJS.

## Docker

Commands:

```powershell
docker build -t flecheria/microserviceposts:0.0.1 -f posts.dockerfile ./
docker run flecheria/microservice-posts
docker run -it flecheria/microservice-posts sh
docker exec -it <container id> sh
docker logs <container id>
# pushimage to dockerhub
docker push flecheria/microserviceposts:0.0.1
```

## Kubernetes

Pods Commands:

```powershell
# apply all yaml inside a folder
kubectl apply -f .

kubectl apply -f <pod yaml file>
kubectl delete -f posts.yml
kubectl delete pod <pods name>
kubectl get pods
kubectl logs <pods name>
kubectl describe pod <pods name>
kubectl exec -it <pods name> -- <commands>
```

Deployment Commands:

```powershell
kubectl apply -f <deployment yaml file>
kubectl delete <deployment name>
kubectl get deployments
kubectl describe deployment <deployment name>

# rollout new deployment from dockerhub
kubectl rollout restart deployment <deployment name>
```

Service Commands:

```powershell
kubectl apply -f <service yaml file>
kubectl get services
kubectl describe service <service name>
kubectl get pod -l=app=posts
```

Make alias for shell (zsh):

```powershell
code ~/.zskrc
# write alias kubectl=k
```

## Nginx Ingress

```powershell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml

kubectl get pods --namespace=ingress-nginx

kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s
```

## Notes

Tweak hosts file /etc/hosts

```powershell
sudo nano /etc/hosts
sudo open -a TextEdit /etc/hosts
```

To determine what process might be using port 80 on localhist, run:

```powershell
#macOS / Linux
sudo lsof -i tcp:80

# Windows:
netstat -aon | findstr :80
```

## Reference

[Run multiple terminal](https://stackoverflow.com/questions/60621321/create-multiple-terminals-and-run-commands-in-vscode)  
[Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals)  
[Macro Multi-Command](https://marketplace.visualstudio.com/items?itemName=ryuta46.multi-command)  
[Kubernets Linters](https://stackoverflow.com/questions/64080471/kubernetes-one-or-more-containers-do-not-have-resource-limits-warning-in-vs-c)  
[Nginx ingress installation](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)  
[The Mac Hosts File: How to Modify /etc/hosts in Mac OS X with TextEdit](https://osxdaily.com/2016/02/29/modify-hosts-mac-os-x-textedit/)
[Skaffold](https://skaffold.dev/)  
