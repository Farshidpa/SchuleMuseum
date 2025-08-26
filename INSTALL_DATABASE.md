# Database Installation & Setup Guide

## Prerequisites

### 1. Install MySQL Server

#### Option A: MySQL Community Server (Recommended)
1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
2. Run the installer and follow the setup wizard
3. **IMPORTANT**: Remember your root password!
4. Choose port 3306 (default)
5. Start MySQL service

#### Option B: XAMPP (Easier for beginners)
1. Download XAMPP from: https://www.apachefriends.org/
2. Install XAMPP
3. Start Apache and MySQL services from XAMPP Control Panel

#### Option C: MySQL Workbench (GUI Tool)
1. Download from: https://dev.mysql.com/downloads/workbench/
2. Use this for database management and queries

## Setup Steps

### Step 1: Install Node.js Dependencies
```bash
# Install all project dependencies
npm install

# If the above fails, install packages individually:
npm install mysql2 @prisma/client prisma autoprefixer
npm install --save-dev @types/mysql2 ts-node
```

### Step 2: Create Database
Open MySQL command line or MySQL Workbench and run:

```sql
-- Create the database
CREATE DATABASE schule_museum;

-- Create a dedicated user (optional but recommended)
CREATE USER 'museum_user'@'localhost' IDENTIFIED BY 'museum_password';
GRANT ALL PRIVILEGES ON schule_museum.* TO 'museum_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify the database was created
SHOW DATABASES;
```

### Step 3: Configure Environment Variables
Create or update the `.env` file in your project root:

```env
# Database Configuration
DATABASE_URL="mysql://root:YOUR_ROOT_PASSWORD@localhost:3306/schule_museum"

# Alternative with dedicated user:
# DATABASE_URL="mysql://museum_user:museum_password@localhost:3306/schule_museum"

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: Direct MySQL connection variables
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_ROOT_PASSWORD
DB_NAME=schule_museum
```

### Step 4: Generate Prisma Client
```bash
# Generate the Prisma client (this creates @prisma/client)
npx prisma generate
```

### Step 5: Run Database Migrations
```bash
# Create and apply the database schema
npx prisma migrate dev --name init

# If prompted for migration name, use: "initial_schema"
```

### Step 6: Seed the Database (Optional)
```bash
# Add sample data to your database
npm run db:seed
```

### Step 7: Verify Installation
```bash
# Open Prisma Studio to view your data
npm run db:studio

# Or test the API endpoint
# Start your dev server and visit: http://localhost:3000/api/test-db
npm run dev
```

## Troubleshooting Common Issues

### Error: "Cannot find module '@prisma/client'"
**Solution:**
```bash
npx prisma generate
npm install @prisma/client
```

### Error: "Cannot find module 'mysql2/promise'"
**Solution:**
```bash
npm install mysql2 @types/mysql2
```

### Error: "Access denied for user"
**Solutions:**
1. Check your MySQL root password
2. Make sure MySQL service is running
3. Try connecting with MySQL Workbench first
4. Update DATABASE_URL in .env file

### Error: "Unknown database 'schule_museum'"
**Solution:**
```sql
CREATE DATABASE schule_museum;
```

### Error: "Can't connect to MySQL server"
**Solutions:**
1. Start MySQL service:
   - Windows: Services → MySQL → Start
   - XAMPP: Start MySQL in Control Panel
2. Check if MySQL is running on port 3306
3. Check firewall settings

### Error: "Prisma migrate failed"
**Solution:**
```bash
# Reset the database (WARNING: This deletes all data!)
npx prisma migrate reset

# Or create a new migration
npx prisma migrate dev
```

## Available Commands

```bash
# Database commands
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run database migrations
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database with sample data

# Development commands
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run lint          # Run ESLint
```

## Database Schema Overview

Your database includes:

- **users** - User management (Admin, Curator, Visitor)
- **exhibitions** - Museum exhibitions with pricing
- **artifacts** - Museum items and objects
- **events** - Guided tours, workshops, events
- **bookings** - Reservation system for events

## Next Steps

1. ✅ Install MySQL
2. ✅ Configure .env file
3. ✅ Run `npm install`
4. ✅ Run `npx prisma generate`
5. ✅ Run `npx prisma migrate dev`
6. ✅ Run `npm run db:seed`
7. ✅ Start development: `npm run dev`

## Quick Test

After setup, visit these URLs to test:
- http://localhost:3000 - Main application
- http://localhost:3000/api/test-db - Database connection test
- http://localhost:5555 - Prisma Studio (after running `npm run db:studio`)

## Need Help?

If you encounter issues:
1. Check MySQL service is running
2. Verify .env file configuration
3. Check database exists and user has permissions
4. Try running commands individually
5. Check MySQL error logs
