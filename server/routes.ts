import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the project root
  app.use(express.static(path.join(process.cwd())));
  
  // Route for the homepage
  app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
  });
  
  // Routes for other HTML pages
  app.get('/:page.html', (req, res) => {
    const pageName = req.params.page;
    res.sendFile(path.join(process.cwd(), `${pageName}.html`));
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
