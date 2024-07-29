import pandas as pd
from flask import Blueprint , jsonify

bp = Blueprint('explore' , __name__)


def shorten_categories(categories , cutoff):
    categorical_map = {}
    for i in range(len(categories)):
        if categories.values[i] >= cutoff:
            categorical_map[categories.index[i]] = categories.index[i]
        else:
            categorical_map[categories.index[i]] = 'Other'
    return categorical_map


def clean_experience(x):
    if x ==  'More than 50 years':
        return 50
    if x == 'Less than 1 year':
        return 0.5
    return float(x)


def clean_education(x):
    if 'Bachelor’s degree' in x:
        return 'Bachelor’s degree'
    if 'Master’s degree' in x:
        return 'Master’s degree'
    if 'Professional degree' in x or 'Other doctoral' in x:
        return 'Post grad'
    return 'Less than a Bachelors'


def load_data():
    data = pd.read_csv('survey_results_public.csv')
    data = data[['Country' , 'EdLevel' , 'YearsCodePro' , 'Employment' , 'ConvertedComp']]
    data = data[data['ConvertedComp'].notnull()]
    data = data.dropna()
    data = data[data['Employment'] == 'Employed full-time']
    data = data.drop('Employment' , axis=1)


    country_map = shorten_categories(data.Country.value_counts() , 400)
    data['Country'] = data['Country'].map(country_map)
    data = data[data['ConvertedComp'] < 250000]
    data = data[data['ConvertedComp'] > 10000]
    data = data[data['Country'] != 'Other']

    data['YearsCodePro'] = data['YearsCodePro'].apply(clean_experience)
    data['EdLevel'] = data['EdLevel'].apply(clean_education)

    data = data.rename({'ConvertedComp' : 'Salary'} , axis=1)
    return data

data = load_data()



@bp.route('/get_countries', methods=['GET'])
def get_countries():
    country_counts = data['Country'].value_counts().to_dict()
    return jsonify(country_counts)


@bp.route('/mean_country_salary', methods=['GET'])
def mean_country_salary():
    country_salary = data.groupby('Country')['Salary'].mean().to_dict()
    return jsonify(country_salary)

@bp.route('/mean_salary_experience', methods=['GET'])
def mean_salary_education():
    experience_salary = data.groupby('YearsCodePro')['Salary'].mean().to_dict()
    return jsonify(experience_salary)