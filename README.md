<div align="center">

# Docker 10 Projects Challenge

A hands-on journey to master Docker, containerization, and real-world deployment through practical mini-projects.

<p>
  <img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="320" />
</p>

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](#)
[![Jekyll](https://img.shields.io/badge/Jekyll-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)](#)
[![Status](https://img.shields.io/badge/Progress-Active-success?style=for-the-badge)](#)

</div>

---

## About This Repository

This repository documents my journey learning **Docker from scratch through real projects**.

Instead of only theory, this challenge focuses on building real containers, working with images, and simulating production-like environments.

Roadmap inspiration:
[Top 10 Docker Projects for Beginners](https://www.geeksforgeeks.org/blogs/docker-projects-ideas-for-beginners/)

---

## Goals of This Challenge

- Understand containerization deeply
- Learn Docker images, volumes, and networks
- Deploy real applications using containers
- Practice microservices fundamentals
- Build a DevOps mindset

---

## Completed Projects

### 1) Static Website Hosting with Nginx

**Difficulty:** Easy  
**Tech:** Docker + Nginx (Alpine)

A simple static website served inside a Docker container using Nginx.  
This project shows how to replace local servers with lightweight containers.

#### Run it

```bash
cd 01-static-website
docker build -t my-static-website .
docker run -d -p 8080:80 my-static-website
```

#### Preview

<p align="center">
  <img src="./screenshots/01-static-website.jpeg" width="600" />
</p>

---

### 2) Jekyll Jam - Static Site Playground

**Difficulty:** Easy  
**Tech:** Docker + Jekyll

A fully containerized Jekyll environment to build and preview Markdown-based websites without installing Ruby or Jekyll locally.

#### Run it

```bash
cd 02-jekyll-jam
docker build -t my-jekyll-site .
docker run -d -p 4000:4000 --name jekyll-container my-jekyll-site
```

#### Preview

<p align="center">
  <img src="./screenshots/02-jekyll-jam.jpeg" width="600" />

### 3. Microservices Architecture with Docker Compose

- **Difficulty:** Medium
- **Description:** Orchestrated a multi-container environment using Docker Compose, successfully linking a Node.js/Express backend service with a MongoDB database container.
- **How to Run:**
  ```bash
  cd 03-docker-compose
  docker compose up -d --build
    <img src="./screenshots/03-docker-compose.png alt="GitHub Actions CI/CD Result" width="700"/>
  </p>
  ```
  ### 4. Creating CI/CD Pipelines with Docker (GitHub Actions)
- **Difficulty:** Medium
- **Description:** Implemented automated Continuous Integration (CI) using GitHub Actions. Configured a workflow to automatically build and test Docker images on every code push, ensuring code reliability and preventing broken builds in production.
- **How it Works:**
  A `.github/workflows/docker-ci.yml` file triggers a runner on GitHub servers to execute `docker build` automatically upon any push to the main branch.
- **Result:**
  <br>
  <img src="./screenshots/04-.github.png" alt="GitHub Actions CI/CD Result" width="700"/>

  ### 5. Dockercraft (Minecraft Game Server)

- **Difficulty:** Medium
- **Description:** Deployed a dedicated Minecraft game server using Docker Compose. This project demonstrates how to containerize non-HTTP TCP/UDP applications, manage complex environment variables, and limit container resource usage (RAM).
- **How to Run:**
  ```bash
  cd 05-dockercraft
  docker compose up -d
  ```

### 6. Memcached SaaS Using Docker

- **Difficulty:** Easy
- **Description:** Containerized a Memcached caching server to improve application performance. Wrote a Node.js script to test setting and retrieving data from the cache in real-time.
- **How to Run:**
  ```bash
  cd 06-memcached
  docker build -t my-memcached .
  docker run -d -p 11211:11211 --name memcache-saas my-memcached
  node test-cache.js
  ```

### 8. Advanced Virtualization: KubeVirt on Kubernetes

- **Difficulty:** Hard
- **Description:** Deployed a local Kubernetes cluster using Minikube and Docker. Configured KubeVirt to manage Virtual Machines (VMs) alongside containers. This project demonstrates the ability to handle complex cloud-native infrastructure and virtualization layers.
- **Tools:** Minikube, Kubectl, KubeVirt, YAML.
- **Result:**
  <br>
  <img src="./screenshots/08-kubevirt.jpeg" alt="KubeVirt VM Result" width="700"/>

---

---

---

## What I Learned So Far

- How Docker isolates environments
- The difference between images and containers
- Real-world usage of Nginx inside containers
- How development environments become portable
- Why Docker is essential for DevOps workflows

---

## Upcoming Projects

- Microservices architecture with Docker Compose
- CI/CD pipeline using Docker and GitHub Actions
- Fullstack app containerization
- Load-balanced multi-container setup
- Real-world deployment project (AWS or VPS)

---

## Why This Repo Matters

Docker is not just a tool; it is a mindset shift in how software is built and deployed.

This repo is my step-by-step evolution from:

- "I run code on my machine"
- to "I ship environments anywhere instantly"

---

## Support

If you find this useful, give it a star and follow the journey.  
More advanced Docker and DevOps projects are coming soon.
