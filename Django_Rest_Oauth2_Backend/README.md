# Django OAuth2 Example

*Django OAuth2 Example is a web application that demonstrates the implementation of OAuth2 authentication using Django framework. OAuth2 is an industry-standard protocol for authorization, allowing users to grant limited access to their resources on one website to another website without sharing their credentials*
![doc-app.png](docs%2Fdoc-app.png)
***

## :hammer_and_wrench: Get Started
- Clone Project
```bash
git clone <project url>
```

- Go to project folder
```bash
cd <application name>
```

- Create virtual environment
```Bash
python3 -m venv .venv  
```

- Activate virtual environment
```Bash
source .venv/bin/activate
```

- Create `.env` file loot at `.env-example` for example

> ### :grey_exclamation: **Note**
> - Next commands will be run with `make`. If make is not installed, just copy commands from `Makefile` 

> ### :warning: **Warning**
> - All commands with `make` must be run from root folder 
> - If you do not use `make` open `Makefile` copy command and run it manually 

- Install project dependency
```Bash
make install 
```

- Migrate Database
```Bash
make makemigration 
```

- Apply migration
```Bash
 make migrate
```

- Create `superuser`
```Bash
make createsuperuser
```

- Run server
```Bash
make runserver 
```

- Done