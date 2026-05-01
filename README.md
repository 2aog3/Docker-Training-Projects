<div align="center">

# Docker Mastery: 10-Project Challenge

**Ahmad Oglah Abuzaid**
Computer Science Student — German Jordanian University (GJU)
Backend Developer Intern — Artl Studio
Interests: Cybersecurity · Secure Backend Systems · Cloud-Native Infrastructure

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](#)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](#)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](#)
[![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](#)
[![Status](https://img.shields.io/badge/All_10_Projects-Completed-success?style=for-the-badge)](#)

</div>

---

## About This Repository

This repository documents a structured, hands-on journey through Docker and container orchestration — from the simplest static site to a Kubernetes-based virtual machine. Each of the ten projects builds on the last, progressively introducing more advanced concepts: multi-container networking, CI/CD automation, horizontal scaling, observability, and security-hardened gateways. The series culminates in a project that applies rate-limiting as a first line of defense in a containerized API environment.

This challenge is inspired by the [Top 10 Docker Projects for Beginners](https://www.geeksforgeeks.org/blogs/docker-projects-ideas-for-beginners/) article on GeeksForGeeks. Projects 01–06 and 08 follow the original list exactly. For projects 07, 09, and 10, I deliberately replaced the suggested projects with more practical and personally relevant alternatives — explained in each project's section below.

| # | Original (GFG) | What I Built Instead | Reason |
|---|----------------|----------------------|--------|
| 07 | RancherVM | Nginx Load Balancer | RancherVM is outdated and no longer actively maintained. An Nginx round-robin load balancer is a fundamental, widely-used pattern in real production systems. |
| 09 | Dokku | Prometheus + Grafana | Dokku is niche. Prometheus + Grafana is the actual industry standard for observability and is a core skill in any DevOps or backend role. |
| 10 | Passenger Docker | Secure Gateway with Rate Limiting | Passenger Docker is a deployment wrapper. A rate-limiting gateway is directly tied to my interest in cybersecurity and demonstrates a concrete, attackable security concept. |

---

## Table of Contents

| # | Project | Key Technology |
|---|---------|----------------|
| 01 | [Static Website with Nginx](#01---static-website-with-nginx) | Docker · Nginx |
| 02 | [Jekyll Static Site Generator](#02---jekyll-static-site-generator) | Docker · Jekyll |
| 03 | [Node.js + MongoDB with Docker Compose](#03---nodejs--mongodb-with-docker-compose) | Docker Compose · Express · MongoDB |
| 04 | [CI/CD with GitHub Actions](#04---cicd-with-github-actions) | GitHub Actions · Docker Build |
| 05 | [Minecraft Server (Dockercraft)](#05---minecraft-server-dockercraft) | Docker · itzg/minecraft-server |
| 06 | [Custom Memcached Image](#06---custom-memcached-image) | Docker · Memcached |
| 07 | [Nginx Load Balancer](#07---nginx-load-balancer) | Docker Compose · Nginx Upstream |
| 08 | [KubeVirt Virtual Machine](#08---kubevirt-virtual-machine) | Kubernetes · KubeVirt |
| 09 | [Prometheus & Grafana Monitoring](#09---prometheus--grafana-monitoring) | Docker Compose · Prometheus · Grafana |
| 10 | [Secure Gateway with Rate Limiting](#10---secure-gateway-with-rate-limiting) | Nginx · Rate Limiting · Security |

---

## 01 - Static Website with Nginx

<p align="center">
  <img src="./screenshots/01-static-website.jpeg" width="700" alt="Project 01 - Static Website" />
</p>

### Objective

The goal of this project was to understand the most fundamental Docker workflow: take a static HTML file and serve it through a production-grade web server — all inside a container. Rather than installing Nginx on the host machine, the entire server is packaged and runs in complete isolation.

### Technical Implementation

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
```

The Dockerfile uses `nginx:alpine` as the base image — Alpine Linux is a minimal, security-oriented distribution that keeps the final image under 25 MB. The HTML file is copied directly into Nginx's default web root. No additional configuration is needed; Nginx serves it automatically on port 80.

The page itself is a right-to-left Arabic HTML document, which validates that the containerized server handles UTF-8 character encoding and `dir="rtl"` layout correctly.

**Key concepts practiced:**
- Writing a minimal, two-line Dockerfile
- Understanding image layers (`FROM` → `COPY`)
- Container isolation versus host installation

### Result

Running `docker build` and `docker run -p 8080:80` served the Arabic welcome page at `localhost:8080` instantly — no local Nginx installation, no dependency conflicts. The container runs identically on any machine with Docker installed.

```bash
cd 01-static-website
docker build -t my-static-website .
docker run -d -p 8080:80 my-static-website
```

---

## 02 - Jekyll Static Site Generator

<p align="center">
  <img src="./screenshots/02-jekyll-jam.jpeg" width="700" alt="Project 02 - Jekyll Jam" />
</p>

### Objective

This project introduced the concept of using Docker as a portable development environment. Instead of installing Ruby, Bundler, and Jekyll on the host machine — a process that varies across operating systems — the entire build toolchain is encapsulated inside a Docker image.

### Technical Implementation

```dockerfile
FROM jekyll/jekyll:minimal
WORKDIR /srv/jekyll
COPY . .
CMD ["jekyll", "serve", "--force_polling", "-H", "0.0.0.0", "-P", "4000"]
```

The official `jekyll/jekyll:minimal` image provides a pre-configured Ruby environment. The `WORKDIR` instruction sets the working directory to `/srv/jekyll`, the standard path Jekyll expects. The `--force_polling` flag is used because Docker on certain systems does not propagate filesystem events from the host into the container, so polling ensures live reload works correctly. Binding to `0.0.0.0` (instead of `127.0.0.1`) is essential for the port to be reachable from outside the container.

The site configuration:

```yaml
# _config.yml
title: My Docker Jekyll Site
description: Learning Docker step by step!
```

The `index.md` is written in Markdown and converted to HTML by Jekyll at runtime — demonstrating that the container handles the full build pipeline, not just static file serving.

**Key concepts practiced:**
- Using pre-built tool images as self-contained environments
- Port binding with `-H 0.0.0.0`
- Separating source files from the build process

### Result

The Jekyll development server started on port 4000 and converted the Markdown source into a rendered HTML page. Any change to `index.md` triggered an automatic rebuild inside the container, with no local dependency installed on the host.

```bash
cd 02-jekyll-jam
docker build -t my-jekyll-site .
docker run -d -p 4000:4000 my-jekyll-site
```

---

## 03 - Node.js + MongoDB with Docker Compose

<p align="center">
  <img src="./screenshots/03-docker-compose.png" width="700" alt="Project 03 - Docker Compose" />
</p>

### Objective

This is where multi-container orchestration begins. The project connects a Node.js/Express API to a MongoDB database — two separate containers that communicate over a private Docker network — without any manual network configuration.

### Technical Implementation

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=${MONGO_URI}
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
```

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Docker Compose creates an internal network automatically; the `app` service resolves the hostname `mongo` directly (as set in `MONGO_URI`) without needing to know any IP address. The `depends_on` directive ensures MongoDB starts before the application container — critical for a service that connects on startup.

The `package.json` is copied and `npm install` is run *before* the source files are copied. This is a deliberate **layer-caching optimization**: if only application code changes, Docker reuses the cached `node_modules` layer and skips reinstalling dependencies entirely.

**Key concepts practiced:**
- Docker Compose multi-service orchestration
- Internal DNS-based service discovery
- Environment variable injection
- Dockerfile layer caching strategy

### Result

A single `docker compose up` started both the Express API and MongoDB. The server logged `MongoDB connected` and responded to HTTP requests at `localhost:5000`. The two services communicated entirely through Docker's internal network, with MongoDB never needing to be exposed to the internet.

```bash
cd 03-docker-compose
docker compose up -d --build
```

---

## 04 - CI/CD with GitHub Actions

<p align="center">
  <img src="./screenshots/04-.github.png" width="700" alt="Project 04 - GitHub Actions CI/CD" />
</p>

### Objective

This project moves beyond local development and integrates Docker into a Continuous Integration pipeline. The goal was to automate the process of building and validating the Docker image every time new code is pushed to the repository — catching broken builds before they reach production.

### Technical Implementation

```yaml
# .github/workflows/docker-ci.yml
name: Docker CI Pipeline

on:
  push:
    branches: ["main", "master"]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Build Docker Image
        run: |
          cd 03-docker-compose
          docker build -t test-node-app .

      - name: List Docker Images
        run: docker images
```

The workflow triggers automatically on every push to `main` or `master`. It runs on a fresh GitHub-hosted Ubuntu runner that has Docker pre-installed. The pipeline checks out the repository, builds the Docker image for the Node.js application, and lists all available images to confirm success.

If the `docker build` command fails — due to a broken Dockerfile, a missing file, or a failed `npm install` — the pipeline fails and the bad commit is flagged immediately in the GitHub UI.

**Key concepts practiced:**
- GitHub Actions workflow syntax (triggers, jobs, steps)
- Automated Docker builds in CI
- Shift-left quality verification

### Result

Every push to the main branch automatically triggered the workflow. The GitHub Actions dashboard displayed a green checkmark upon a successful build, confirming the image was reproducible from a clean environment — not just on the developer's local machine.

---

## 05 - Minecraft Server (Dockercraft)

<p align="center">
  <img src="./screenshots/05-dockercraft.png" width="700" alt="Project 05 - Dockercraft Minecraft Server" />
</p>

### Objective

This project demonstrates how Docker can run complex, stateful, third-party server applications without any manual installation. A fully functional Minecraft Java Edition server — including EULA acceptance, version pinning, and memory allocation — is configured entirely through environment variables.

### Technical Implementation

```yaml
# docker-compose.yml
version: "3.8"
services:
  minecraft-server:
    image: itzg/minecraft-server
    ports:
      - "25565:25565"
    environment:
      EULA: "TRUE"
      VERSION: "1.20.4"
      MEMORY: "4G"
    tty: true
    stdin_open: true
```

The `itzg/minecraft-server` image handles the full server lifecycle: downloading the correct server JAR, applying the EULA, configuring memory, and launching the Java process. By setting `VERSION: "1.20.4"`, the server version is pinned and reproducible across any deployment. The `MEMORY: "4G"` flag internally passes `-Xmx4G -Xms4G` to the JVM. `tty: true` and `stdin_open: true` keep the server console interactive for live commands.

Port 25565 is the default Minecraft port, exposed directly to the host, allowing any Minecraft client to connect to `localhost:25565`.

**Key concepts practiced:**
- Using community-maintained images for complex applications
- Environment variable-driven configuration
- Interactive TTY containers
- Resource allocation via environment variables

### Result

The Minecraft server started and reached the `Done!` state in the logs, accepting client connections on the default port. This demonstrated that a production-like game server can be deployed, versioned, and torn down in seconds using only Docker and a compose file.

```bash
cd 05-dockercraft
docker compose up -d
```

---

## 06 - Custom Memcached Image

<p align="center">
  <img src="./screenshots/06-memcached.png" width="700" alt="Project 06 - Memcached" />
</p>

### Objective

This project focuses on building a custom Docker image from an official base image. While Memcached can be run directly with `docker run memcached`, wrapping it in a custom Dockerfile is a foundational skill for adding configuration, labels, startup scripts, or extended logic in real-world caching setups.

### Technical Implementation

```dockerfile
FROM memcached:alpine
EXPOSE 11211
CMD ["memcached"]
```

The image is derived from `memcached:alpine`, keeping the footprint minimal. The `EXPOSE 11211` instruction documents the standard Memcached port — the protocol port used by all Memcached clients. The `CMD ["memcached"]` starts the daemon in the foreground, which is the correct behavior for Docker containers (a container stops when its main process exits, so running as a foreground daemon keeps it alive).

In production, additional `CMD` flags can be appended here — for example, `-m 512` to cap memory usage at 512 MB, or `-I 5m` to increase the maximum item size.

**Key concepts practiced:**
- Customizing official base images
- Port documentation with `EXPOSE`
- Foreground vs. background daemon processes in containers

### Result

The custom Memcached image was built and run successfully. The daemon started on port 11211 and was reachable via any Memcached client library, confirming that the containerized cache was fully functional.

```bash
cd 06-memcached
docker build -t my-memcached .
docker run -d -p 11211:11211 my-memcached
```

---

## 07 - Nginx Load Balancer

> **Replaced from original list:** The GFG article suggested **RancherVM** (running VMs as Docker containers using Rancher). RancherVM is largely abandoned and incompatible with modern Kubernetes setups. I replaced it with an Nginx round-robin load balancer — a more practical, universally applicable pattern that appears in virtually every production microservice architecture.

<p align="center">
  <img src="./screenshots/07-load-balancer.png" width="700" alt="Project 07 - Load Balancer" />
</p>

### Objective

This project implements horizontal scaling: instead of a single application instance, three identical Node.js containers are deployed behind an Nginx reverse proxy that distributes incoming traffic across all of them using round-robin load balancing.

### Technical Implementation

```yaml
# docker-compose.yml
version: "3.8"
services:
  app1:
    build: .
  app2:
    build: .
  app3:
    build: .

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app1
      - app2
      - app3
```

```nginx
# nginx.conf
events {}

http {
    upstream node_cluster {
        server app1:3000;
        server app2:3000;
        server app3:3000;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://node_cluster;
        }
    }
}
```

The Nginx `upstream` block defines the `node_cluster` group with three backends. Nginx uses round-robin by default — each incoming request is forwarded to the next server in the list, cycling through all three. The service names `app1`, `app2`, `app3` are resolved directly by Docker's internal DNS. The configuration file is mounted as a read-only volume (`ro`) to prevent accidental modification from inside the container.

**Key concepts practiced:**
- Nginx upstream configuration
- Round-robin load balancing
- Docker Compose service scaling patterns
- Read-only volume mounts

### Result

Hitting `localhost:8080` repeatedly routed requests to different container instances. Each application instance logged the incoming request independently, visually confirming that load was being distributed evenly. This architecture mirrors horizontally scaled API services behind a gateway in production environments.

```bash
cd 07-load-balancer
docker compose up --build
```

---

## 08 - KubeVirt Virtual Machine

<p align="center">
  <img src="./screenshots/08-KubeVirt.png" width="700" alt="Project 08 - KubeVirt VM" />
</p>

### Objective

This project steps beyond Docker into Kubernetes-native virtualization using **KubeVirt** — a technology that allows traditional Virtual Machines to run as first-class Kubernetes workloads. The VM deployed here, named `ahmad-sentinel-vm`, is a deliberate bridge between container orchestration skills and the virtualization knowledge essential to security infrastructure.

### Technical Implementation

```yaml
# vm.yaml
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: ahmad-sentinel-vm
spec:
  running: true
  template:
    spec:
      domain:
        devices:
          disks:
            - name: containerdisk
              disk:
                bus: virtio
        resources:
          requests:
            memory: 128M
      volumes:
        - name: containerdisk
          containerDisk:
            image: quay.io/kubevirt/cirros-container-disk-demo
```

The manifest defines a `VirtualMachine` custom resource using the `kubevirt.io/v1` API. Setting `running: true` instructs the KubeVirt controller to start the VM immediately upon creation. The VM uses a `containerDisk` volume — a container image that holds a raw disk image, pulled from `quay.io`. CirOS is a minimal Linux distribution used for cloud testing. The `virtio` bus driver is the paravirtualized disk interface optimized for KVM guests.

**Why `ahmad-sentinel-vm`?**

The name is intentional. A "sentinel" in security architecture is a watchpoint — a node positioned to monitor, inspect, or intercept. This VM represents a foundation for running isolated security tools (network scanners, intrusion detection systems, honeypots) inside a Kubernetes cluster, co-located with microservices, without the security risks of running them directly on the host. This project directly connects my interest in cybersecurity with the practical infrastructure skills needed to build isolated, controlled security environments.

**Key concepts practiced:**
- Kubernetes custom resources (CRDs)
- KubeVirt VM lifecycle management
- ContainerDisk volumes
- Virtio paravirtualization drivers
- Hybrid VM + container cluster architecture

### Result

The `ahmad-sentinel-vm` VirtualMachine object was created in the cluster. KubeVirt's controller scheduled the VM as a pod (`virt-launcher-ahmad-sentinel-vm-*`), booted CirOS, and brought the VM to a `Running` state — demonstrating that a complete virtual machine can be managed with standard `kubectl` commands, just like any other Kubernetes workload.

```bash
kubectl apply -f vm.yaml
kubectl get vm
kubectl get vmi
```

---

## 09 - Prometheus & Grafana Monitoring

> **Replaced from original list:** The GFG article suggested **Dokku** (a self-hosted Heroku-like Git deployment platform). While Dokku is functional, it is a niche tool with limited industry adoption. I replaced it with a Prometheus + Grafana monitoring stack — the de facto standard for metrics and observability in containerized environments, and a skill directly expected in backend and DevOps roles.

<p align="center">
  <img src="./screenshots/09-monitoring.jpeg.png" width="700" alt="Project 09 - Monitoring Stack" />
</p>

### Objective

This project deploys a production-grade observability stack. The goal is to collect real-time metrics from running services using Prometheus and visualize them on interactive dashboards in Grafana — the industry-standard combination for container and microservice monitoring.

### Technical Implementation

```yaml
# docker-compose.yml
version: "3.8"
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus
```

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

Prometheus is configured to scrape metrics every 15 seconds. The `prometheus.yml` is mounted as a volume so it can be updated without rebuilding the image. In this configuration, Prometheus scrapes its own metrics endpoint — a self-monitoring pattern useful for validating the pipeline before adding application targets.

Grafana starts after Prometheus via `depends_on` and connects to it using `http://prometheus:9090` as the data source URL. Docker's internal DNS resolves the service name directly.

**Key concepts practiced:**
- Time-series metrics collection with Prometheus
- Grafana data source and dashboard configuration
- Volume-mounted configuration files
- Service dependency ordering in Docker Compose

### Result

Both services started successfully. Prometheus was accessible at `localhost:9090`, displaying its own metrics in the expression browser. Grafana opened at `localhost:3000`, and after adding Prometheus as a data source, dashboards could be built to visualize scrape duration, rule evaluation times, and custom application metrics in real time.

```bash
cd 09-monitoring
docker compose up -d
# Prometheus: http://localhost:9090
# Grafana:    http://localhost:3000
```

---

## 10 - Secure Gateway with Rate Limiting

> **Replaced from original list:** The GFG article suggested **Passenger Docker** (a pre-configured Docker image for deploying Ruby, Node.js, and Python apps). It is a deployment convenience tool with no security dimension. I replaced it with a rate-limiting reverse proxy — a project that directly reflects my interest in cybersecurity and demonstrates a real, exploitable vulnerability (uncapped request rates) being actively defended against.

<p align="center">
  <img src="./screenshots/10-secure-gateway.png" width="700" alt="Project 10 - Secure Gateway" />
</p>

### Objective

This final project focuses on **application security**. It implements a rate-limiting reverse proxy using Nginx — a technique used to defend API endpoints against brute-force attacks, credential stuffing, and denial-of-service attempts. This is a direct application of cybersecurity principles in a containerized architecture.

### Technical Implementation

```yaml
# docker-compose.yml
version: "3.8"
services:
  app_server:
    image: node:18-alpine
    command: >
      sh -c "node -e \"
        const http = require('http');
        http.createServer((req, res) => {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Hello from App Server\n');
        }).listen(3000, () => console.log('Server running on port 3000'));
      \""

  gateway:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "8080:80"
    depends_on:
      - app_server
```

```nginx
# nginx.conf
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=5r/s;

server {
    listen 80;

    location / {
        limit_req zone=mylimit burst=10;
        proxy_pass http://app_server:3000;
    }
}
```

**How the rate limiter works:**

The `limit_req_zone` directive creates a shared memory zone called `mylimit` (10 MB, capable of tracking ~160,000 unique client IPs). It enforces a sustained rate of **5 requests per second per IP address** (`$binary_remote_addr`) using the token-bucket algorithm.

The `burst=10` parameter in `limit_req` allows a short-lived spike of up to 10 additional requests before rejections begin — this tolerates legitimate users loading a page with multiple assets without triggering a false positive. Once the burst capacity is exhausted, Nginx returns `HTTP 503 Service Unavailable`, protecting the backend from being overwhelmed.

The backend (`app_server`) is never exposed directly — it has no published port. All traffic must pass through the gateway, making the rate limiter the single, mandatory enforcement point.

**Security coverage:**

| Threat | Protection Provided |
|--------|---------------------|
| Brute-force login attacks | Limits attempts to 5/s per IP |
| Credential stuffing | Exponential backoff via 503 responses |
| Request flooding / DoS | Burst cap + rate cap absorbs spikes |
| Direct backend access | Backend not exposed on any public port |

**Key concepts practiced:**
- Nginx `limit_req_zone` and `limit_req` directives
- Token-bucket rate limiting algorithm
- Reverse proxy as a security enforcement layer
- Network segmentation in Docker Compose

### Result

Under normal usage, all requests passed through to the app server with a `200 OK` response. When requests exceeded 5 per second, Nginx immediately returned `503` responses, protecting the backend entirely. The backend server remained healthy and unreachable from outside the Docker network — only the gateway was exposed on port 8080. This architecture mirrors the ingress security patterns used in production Kubernetes clusters and API gateways.

```bash
cd 10-secure-gateway
docker compose up -d
# Gateway: http://localhost:8080
```

---

## Skills Demonstrated Across All Projects

| Skill Area | Projects |
|------------|----------|
| Dockerfile authoring | 01, 02, 03, 06, 07 |
| Multi-container orchestration | 03, 07, 09, 10 |
| Nginx configuration (proxy, load balancer, security) | 07, 10 |
| CI/CD pipeline design | 04 |
| Kubernetes & KubeVirt | 08 |
| Observability (Prometheus + Grafana) | 09 |
| Security (rate limiting, network segmentation) | 10 |
| Environment variable management | 03, 05 |
| Image optimization (Alpine base images) | 01, 02, 03, 06, 07 |

---

## How to Run Any Project

Each project is self-contained in its own directory.

```bash
# Single-container projects (01, 02, 06)
docker build -t project-name .
docker run -p <host-port>:<container-port> project-name

# Docker Compose projects (03, 05, 07, 09, 10)
docker compose up --build

# Kubernetes project (08)
kubectl apply -f vm.yaml
kubectl get vm
```

---

## About the Author

**Ahmad Oglah Abuzaid**
German Jordanian University — Computer Science
Backend Developer Intern — Artl Studio

Focused on the intersection of secure backend systems and cloud-native infrastructure. This challenge was completed as a practical deep-dive into containerization, orchestration, and security patterns that underpin modern software deployments.

[GitHub Profile](https://github.com/Vplo)
