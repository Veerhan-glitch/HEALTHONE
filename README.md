#inital setup
Clone the repository:

##
    git clone https://github.com/Veerhan-glitch/HEALTHONE/
    
Navigate to the project folder:

##
    cd HEALTHONE
    
Create and activate a virtual environment:

On Linux/macOS:

##
    python -m venv venv
    source venv/bin/activate

On Windows:
##
    python -m venv venv
    venv\Scripts\activate
    
Install dependencies:

##
    pip install -r requirements.txt


Apply database migrations:

##
    python manage.py migrate


Run the development server:

##
    python manage.py runserver


python manage.py makemigrations
python manage.py migrate



TODO:
remove redundency
use {%static%} insted of /static
sync db
ctrf tokan
proper authentication