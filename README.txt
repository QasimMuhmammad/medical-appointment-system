README:

Steps to run Appoint, the web based appointment system:

1. Install MySQL version 5.7 (not 8 for Node.js compatibility)
2. Install the latest version of Node.js
3. Open the folder containing server.js,
  (should be called medical-appointment-system)
4. Run the command npm install
5. Open the file named "credidentials.json" (misspelt)
6. Run the database initialization commands in order

  NOTE: Some of these commands may not automatically stop.
        Manually stop them using CTRL + C

  6.1 node scripts/createDB.js
  6.2 node scripts/createTables.js
  6.3 node scripts/populateDb.js

7. Start the server using the command
    node server.js
8. Navigate to the website located at the url localhost:3000
9. Login for a receptionist is:
  username: 1
  password: 1
