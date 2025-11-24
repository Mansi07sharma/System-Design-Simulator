# 🛠️ System Design Simulator

<div align="center">

**Visualize. Simulate. Validate. Scale.**

*A complete interactive platform to design high-level system architectures and instantly simulate real-world performance metrics like latency, RPS, bottlenecks, and capacity requirements.*

</div>

---

##  Overview

**System Design Simulator** is an interactive tool for engineers, students, and architects to visually build distributed systems and validate whether the architecture meets SLA/SLO requirements.

### Why This Project?

- **Bridge Theory → Practice**: Turn system design interviews into working simulations
- **Instant Validation**: Know if your architecture can handle 10K RPS *before* building it
- **Learn by Doing**: Experiment with load balancers, caches, queues without infrastructure costs

---

## ✨ Key Features

###  **Drag-and-Drop (by click) HLD Builder**
Built with **React Flow** for intuitive visual design:
- Client / Web Browser
- Load Balancer
- API Gateway
- Microservices
- Databases (SQL/NoSQL)
- Caches (Redis, Memcached)
- Message Queues (Kafka, RabbitMQ)
- CDN (CloudFront, Akamai)
- And more...

###  **Real-Time Simulation Engine**
After designing your architecture, enter:
- ✅ SLA latency target (e.g., 200ms)
- ✅ Expected RPS (e.g., 5000 requests/sec)

The simulator instantly shows:
- 🔍 **End-to-end latency** for each request path
- 📊 **RPS distribution** across nodes
- ⚠️ **Bottleneck detection** (overloaded components)
- ⚡ **Scaling recommendations** (e.g., "Add 3 more API servers")
- 🔄 **Capacity analysis** per component

### **Secure Authentication**
Multiple login options:
- 🟢 **Google OAuth 2.0 (Passport.js)**
- 📧 **Email/Password** (JWT-based)
- 🔒 **Bcrypt password encryption**
- 🔑 **JWT token management** (access + refresh tokens)

### 💾 **Save & Load Designs**
- Store architectures in MongoDB
- Revisit and modify previous designs
- Run simulations anytime

---

## How the Simulator Works

### 1️⃣ **Latency Model**
Each component has predefined latency values based on industry standards:

| Component | Latency |
|-----------|---------|
| Load Balancer | ~2ms |
| Network Hop | ~10-20ms |
| API Gateway | ~3-5ms |
| Database (Read) | ~30-50ms |
| Database (Write) | ~50-80ms |
| Cache (Redis) | ~1-2ms |
| Message Queue | ~5-10ms |
and many more...

**Total Latency Calculation:**
```
total_latency = Σ (latency_of_each_node_in_path)
```

### 2️⃣ **Capacity Model**
Each service calculates capacity as:
```
capacity = Minumum Capacity 
```

**Bottleneck Detection:**
```
IF required_rps > capacity
  → Mark node as bottleneck
  → Suggest: "Add X more instances"
```

### 3️⃣ **RPS Propagation**
Traffic distribution across:
- Load balancers (round-robin/weighted)
- Microservices (parallel processing)
- Database replicas (read/write splits)

---

##  Tech Stack

### **Frontend**
- ⚛️ React.js (UI components)
- 🔄 React Flow (visual graph builder)
- 🎨 Tailwind CSS (styling)

### **Backend**
- 🟢 Node.js + Express.js (REST APIs)
- 🍃 MongoDB + Mongoose (data storage)
- 🔐 JWT (authentication)
- 🔑 OAuth 2.0 (Google integration)
- 🔒 Bcrypt (password hashing)

---

##  System Architecture

```
┌─────────────────────────────────────────────────┐
│         Frontend (React + React Flow)           │
│  - Visual HLD Builder                           │
│  - Simulation Dashboard                         │
│  - Auth Pages (Login/Register)                  │
└────────────┬────────────────────────────────────┘
             │
             │ REST API Calls (JWT Auth)
             │
┌────────────▼────────────────────────────────────┐
│       Backend (Node.js + Express)               │
│  - Auth APIs (OAuth + JWT)                      │
│  - Design APIs (Save/Load)                      │
│  - Simulation Engine                            │
└────────────┬────────────────────────────────────┘
             │
             │ Mongoose ODM
             │
┌────────────▼────────────────────────────────────┐
│          MongoDB (Database)                     │
│  - Users Collection                             │
│  - Designs Collection                           │
└─────────────────────────────────────────────────┘
```

---

##  Getting Started

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mansi07Sharma/System-Design-Simulator.git
cd System-Design-Simulator
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create `.env` in `backend/`:
```env
MONGO_URI=mongodb://localhost:27017/system_design_simulator
JWT_SECRET=your_super_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

```

4. **Run the application**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
nodemon handler.js
```

5. **Open browser**
```
http://localhost:5173
```

## Use Cases

1. **Interview Preparation** - Practice system design scenarios with instant feedback
2. **Capacity Planning** - Validate if your architecture meets SLA requirements
3. **Learning Tool** - Understand how components interact under load
4. **Team Collaboration** - Share and discuss architecture designs
5. **Cost Estimation** - Plan infrastructure before deployment

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Author

**Mansi Sharma**  
B.Tech CSE | Full-Stack Developer | Distributed Systems Enthusiast

## Support

If you find this project helpful, please ⭐ **star the repository** to show your support!
---

## Acknowledgments

- React Flow for the amazing graph visualization library
- MongoDB for reliable data storage
- The open-source community for inspiration
---

<div align="center">
Made with by Mansi Sharma
</div>
