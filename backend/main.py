
from flask import Flask
from flask_cors import CORS 
from dotenv import load_dotenv
from predict import bp as predict_bp
from explore import bp as explore_bp


app = Flask(__name__)
CORS(app, origins='*') 
load_dotenv()


app.register_blueprint(predict_bp)
app.register_blueprint(explore_bp)