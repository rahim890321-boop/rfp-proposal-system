 # RFP Proposal Management System

A professional backend system built with **NestJS**, **Prisma**, and **Google Gemini AI** for automated RFP processing.

## 🚀 Features
- **AI Assessment:** Integration with Google Gemini for smart summaries.
- **Smart Timer:** 15-minute context window for assessment security.
- **PDF Engine:** Automated professional report generation.
- **Docker Ready:** Deploy anywhere with a single command.
- **API Docs:** Integrated Swagger UI.

## 🛠️ Tech Stack
- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL with Prisma ORM
- **AI:** Google Generative AI (Gemini Pro)
- **Infrastructure:** Docker & Docker Compose

## 📖 Setup Instructions
1. Clone the repository.
2. Create a `.env` file based on `.env.example`.
3. Add your `GEMINI_API_KEY`.
4. Run the application:
   ```bash
   docker-compose up --build
