Problem Statement
According to the World Health Organization, 83% of preventable deaths occur due to delays in initial response and access to hospitals. The fragmented nature of current healthcare systems contributes significantly to these delays. HEALTHONE addresses this by building an intelligent, integrated platform that ensures real-time coordination across emergency services and routine care.

Key Features:

    Built using React and JavaScript
    
    Intuitive UI for:
        Booking appointments
        Requesting specialist referrals
        Ordering lab tests and medications
        Managing patient dashboards
    
    Backend Infrastructure
        Developed with Python, Django, and Django REST Framework
        RESTful API design with JSON integration
        Secure authentication and authorization for data protection
    
    Database Design
        PostgreSQL for robust relational data management
        
    Features:
        Normalized schema
        Foreign key constraints, indexing, joins for efficient queries
        Transactional views to ensure ACID properties
    
    Emergency Response Module
        Integrated vector database (FAISS) with LLM for:
        Real-time condition identification from chat inputs
    Smart emergency tips (e.g., aspirin recommendation for chest pain)

Video Demonstation:



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
