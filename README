==========================================
* To clone and setup your git respository:
==========================================

(Only need to do this once, to make sure commits have your name)
Run the following command, replace your_name and your_email with yours:
git config --global user.name <your_name>  
git config --global user.email <your_email>  

1. In introHCI directory, run following command:
git clone https://github.com/erikaji/rosebt.git

2. cd rosebt

3. Run each of the following in prompt:
git config --add branch.master.rebase true
git config --add branch.autosetuprebase always 

4. Open readbymood/.git/config file and add the following lines to bottom of file:
[alias]  
           st = status  
           co = checkout  
           br = branch  
           lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative

Notes: The rebase makes it so that we have a clear and easy way to merge and commit with minimal conflicts.



===============================
* Editing and commit procedure:
===============================

1. Edit, git add -u, and git commit -m your changes as needed
2. git pull (if there are conflicts, follow steps on screen to resolve them)
3. git lg (to check that no funky mergers happened - it should be nice and linear with your changes on top)
4. git push origin master
5. git push heroku master (to push to webspace)



===============================
* Directory Organization:
===============================

- public/css
- public/images
- routes (javascript files)
- views (handlebars/HTML files)
- app.js (main javascript file; to add routes, edit variables at the top AND routes at the bottom)



===============================
* MySQL Setup:
===============================

1. Download and install MySQL (including the MySQL Workbench) from the internet.
2. Setup the Node.js MySQL Library by executing the following command in rosebt: npm install mysql
3. Open up MySQL Workbench and connect to our "rosebt" herokuapp's ClearDB MySQL server:

host		us-cdbr-east-05.cleardb.net
username	ba3bd950dbfbed
password	573b449f

4. We will be working in the following schema:
schema		heroku_f6c3e56bf244b8e
Currently, there are two tables: 1) user, and 2) rbt.



===============================
* For Reference:
===============================

CLEARDB_DATABASE_URL
mysql://ba3bd950dbfbed:573b449f@us-cdbr-east-05.cleardb.net/heroku_f6c3e56bf244b8e?reconnect=true