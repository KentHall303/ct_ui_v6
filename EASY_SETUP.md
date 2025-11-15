# Easy Setup Guide for Non-Technical Users

**No coding experience needed!** Just follow these simple steps.

## Step 1: Get the Project Files

1. Ask your team admin for the project repository link
2. Click the green "Code" button on GitHub
3. Click "Download ZIP"
4. Unzip the folder on your computer

**OR** if you're using Bolt.new:
- The files are already there!

## Step 2: Get Your Database Credentials

Ask your team admin for two things:

1. **Supabase URL** - looks like: `https://abc123.supabase.co`
2. **Supabase Key** - a long string of letters and numbers

Write these down or save them somewhere safe!

## Step 3: Create Your .env File

1. In your project folder, create a new file called `.env` (yes, with the dot at the start!)
2. Open it in any text editor (Notepad, TextEdit, VS Code, etc.)
3. Type exactly this:

```
VITE_SUPABASE_URL=paste-your-url-here
VITE_SUPABASE_ANON_KEY=paste-your-key-here
```

4. Replace the parts after `=` with the values from Step 2
5. Save the file

**Example:**
```
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Install Everything

Open your terminal (or command prompt) and type:

```bash
npm install
```

Press Enter and wait. This might take a minute or two.

**What's happening?**
- Installing all the tools the project needs
- Checking your database connection

## Step 5: Check Your Database

Type this command:

```bash
npm run db:check
```

You'll see one of two things:

### ✅ If you see green checkmarks:
```
✅ estimators          - 8 records
✅ calendar_events     - 60 records
✅ opportunities       - 40 records
```

**Congrats! You're done!** Skip to Step 7 (Start the App).

### ❌ If you see red X marks or warnings:
```
❌ estimators           - Missing
❌ calendar_events      - Missing
```

**Don't worry!** Continue to Step 6.

## Step 6: Set Up Your Database (If Needed)

If Step 5 showed red X marks, run this:

```bash
npm run db:setup
```

This will show you exactly what to do. It looks like this:

```
🚀 Setting Up Your Database

1. Open the Supabase Dashboard: https://app.supabase.co/...
2. Click "SQL Editor" in the left sidebar
3. Click the "+" button to create a new query

4. Copy and paste the SQL from these files (in order):
   1. 20251029223547_create_calendar_events_schema.sql
   2. 20251029223914_seed_calendar_events.sql
   3. ...
```

### What to do:

1. **Open Supabase** - Click the link it shows you
2. **Find SQL Editor** - It's in the menu on the left side
3. **Create a new query** - Click the "+" button
4. **Open the first file** - Go to the `supabase/migrations/` folder
5. **Copy everything** - Select all the text in that file (Ctrl+A or Cmd+A)
6. **Paste into Supabase** - Paste it into the SQL Editor
7. **Click "Run"** - Big button on the right
8. **Repeat** for each file in the list

After you've done all the files, go back to your terminal and run:

```bash
npm run db:check
```

You should now see green checkmarks!

## Step 7: Start the App

Type this:

```bash
npm run dev
```

Wait a few seconds, then open your web browser and go to:

```
http://localhost:5173
```

**You should see:**
- A calendar with appointments
- Multiple estimators (Sara Joe, Test_Account Owner, etc.)
- Sample data everywhere!

## Common Issues & Solutions

### "npm: command not found"

**Problem:** You don't have Node.js installed

**Solution:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download and install the LTS version
3. Restart your terminal
4. Try again

### "Cannot find .env file"

**Problem:** Your .env file isn't in the right place or wasn't saved correctly

**Solution:**
1. Make sure the file is named `.env` exactly (with the dot!)
2. Put it in the main project folder (same folder as package.json)
3. Make sure you saved it after editing

### "Database connection failed"

**Problem:** Your Supabase credentials might be wrong

**Solution:**
1. Double-check your .env file
2. Make sure you copied the entire URL and key
3. Ask your team admin to verify the credentials

### "Tables are missing"

**Problem:** The database migrations haven't been applied yet

**Solution:**
1. Run `npm run db:setup`
2. Follow the step-by-step instructions it gives you
3. Copy and paste the SQL files into Supabase

## Need More Help?

1. **Quick reference:** Check `QUICK_START_MIGRATIONS.md`
2. **Detailed info:** Check `README.md`
3. **Ask your team:** Contact your team admin or project lead

## You're All Set!

Once you see the app running with sample data, you're ready to start working on it. The calendar should show appointments, the pipeline should have opportunities, and everything should just work!

Happy building! 🎉
