# Table of Contents
- [Set Up Instructions](#set-up-instructions)
  - [Django Backend](#django-backend)
  - [Database](#database)
  - [NextJS website](#nextjs-website)
- [Start the Project](#start-the-project)
# Set Up Instructions
You have to set up 3 things, backend, database, and frontend (NextJS)

## Django Backend
1. Install these packages using pip
   ``pip install django djangorestframework django-cors-headers scikit-network numpy``
   Notes: These are the packages I remember I have to install, I don't remember what else I imported
2. Run the server
   `python manage.py runserver`

## Database
1. Installing PostgreSQL on your computer (this instruction got from GRNsight Github ReadME)
    - MacOS and Windows can follow these instructions on how to install postgreSQL.
        - Install the software at this [link](https://www.postgresql.org/download/)
        - > MacOS users: It is recommended to install with homebrew rather than the interactive installation in order to correctly view the  `initdb --locale=C -E UTF-8 location-of-cluster` message in the documentation.
        - > Windows users: when prompted for a password at the end of the installation process, save this password. It is the password for the postgres user
        - Initialize the database
           - If your terminal emits a message that looks like `initdb --locale=C -E UTF-8 location-of-cluster` from Step 1B, then your installer has initialized a database for you.
           - Open the terminal and type the command `initdb --locale=C -E UTF-8 location-of-cluster`
           - "Cluster" is the PostgreSQL term for the file structure of a PostgreSQL database instance
           - You will have to modify location-of-cluster to the folder name you want to store the database (you don't need to create a folder, the command will create the folder for you, just create the name)
        - Start and stop the server
            - Additionally, your installer may start the server for you upon installation (You can save this command for further reuse).
            - To start the server yourself run `pg_ctl start -D location-of-cluster` (You can save this command for further reuse).
            - To stop the server run `pg_ctl stop -D location-of-cluster`.
                - After installing with homebrew on MacOS, you may receive an error when you try to start the server that the server is unable to be started, and when attempting to stop the server, there terminal states there is no server running. In this case, you have to directly kill the port that the server is running on.
                -  To double check that this is the issue, you can open the Activity Monitor app on your computer and search for the `postgres` activity.  If there is one, that means the server is running, and we have to terminate the port that the server is running on.
                - First, we have to check what port the server is running on. Navigate to your homebrew installation, which is the same `location-of-cluster` from when the database was initialized and open that location in VSCode.
                - Search for `port =` in the file `postgresql.conf`. By default, the port should be port 5432, but keep note of this port in case it is different.
                - Refer to this Stack Overflow documentation on how to kill a server:
                  - https://stackoverflow.com/questions/4075287/node-express-eaddrinuse-address-already-in-use-kill-server
                - If that doesn't work, then refer to the different methods on this link from Stack Overflow: 
                  - https://stackoverflow.com/questions/42416527/postgres-app-port-in-use
        
    - Linux users
      - The MacOS and Windows instructions will _probably_ not work for you. You can try at your own risk to check.
      - Linux users can try these [instructions](https://www.geeksforgeeks.org/install-postgresql-on-linux/) and that should work for you (...maybe...). If it doesn't try googling instructions with your specific operating system. Sorry!

2. Loading data to your database
    1. Adding the Schema to your database.
        1. Go into your database using the following command: 
            
            ```
            psql postgresql://localhost/postgres
            ``` 
            
           > For Windows users use this command:
            ```
            psql -U postgres postgresql://localhost/postgres
            ```            
           When prompted for the password, use the password you specified earlier during the installation process. For all future commands requiring you to access postgres, you will need to add ```-U postgres ``` 

           From there, create the schemas using the following commands:
            
            ```
            CREATE SCHEMA gene_regulatory_network_research;
            ```
            
           Once they are created you can exit your database using the command `\q`.
         2. Once your schema's are created, you can add the table specifications using the following commands:
            
            ```
            psql -f <path to <database>/gene-regulatory-network-schema.sql postgresql://localhost/postgres
            ```
            Your database is now ready to accept gene regulatory network data!
    2. Loading CellOracle gene regulatory network to your local database
       1. Install these packages pandas, and sqlalchemy
          ```pip install pandas sqlalchemy dotenv```
       2. Go into `database` folder
       3. Create `.env` file and add your information about DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
       4. Run loading_scripts
          ```python loading_scripts```
       5. Whenever you run the front end, you need to start the database
          ```pg_ctl start -D location-of-cluster```
       6. If you want to stop the database, run this command
          ```pg_ctl stop -D location-of-cluster```

## NextJS website
1. Make sure you have Node.JS install
2. Go into `frontend` folder
3. Run `npm install` to install all dependencies and packages

# Start the Project
1. Start the front end by `npm run dev` inside `frontend` folder
2. Start Django server by going to `backend` folder and run `python manage.py runserver`
3. Make sure your database is running by `pg_ctl start -D location-of-cluster`
