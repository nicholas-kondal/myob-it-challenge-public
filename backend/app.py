from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_mail import Mail, Message
from datetime import datetime
import dateutil.parser
import json, requests, base64

app = Flask(__name__)

# use these to log into https://app.myob.com/ - I.E. NOT THE NZ WEBSITE, THE AU ONE!
USERNAME = 'trust.us.plumbers@gmail.com'
PASSWORD = '[PASSWORD]'
USERNAMEPASSWORD_BASE64ENCODED = '[USERNAMEPASSWORD_BASE64ENCODED]'
with open("./secrets.json") as jsonFile:
    f = json.load(jsonFile)
    jsonFile.close()
API_KEY = f['key']
SECRET = f['secret']
REDIRECT_URI = f['redirect-uri']
COMPANY_FILE_ID = f['company-file-id']
COMPANY_FILE_URI = f['company-file-uri']
URL = 'https://secure.myob.com/oauth2/v1/authorize'

# configure mail
app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = USERNAME,
    MAIL_PASSWORD = PASSWORD,
    DEFAULT_SENDER =  None
))
mail = Mail(app)

# create connection to database
client = MongoClient('mongodb+srv://[URL]/Cluster0?retryWrites=true&w=majority')

def get_query():
    with open("./tokens.json") as jsonFile:
        f = json.load(jsonFile)
        jsonFile.close()
    access_token = f['access_token']
    query = {
        'Authorization': f'Bearer {access_token}',
        #'x-myobapi-cftoken': USERNAMEPASSWORD_BASE64ENCODED,
        'x-myobapi-key': API_KEY,
        'x-myobapi-version': 'v2',
    }
    return query

@app.route("/")
def hello_world():
    return 'Henlo wurld'

@app.route("/login", methods=["GET"])
def login():
    if request.method == 'GET':
        return redirect(f'https://secure.myob.com/oauth2/account/authorize?client_id={API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code&scope=CompanyFile')
    else:
        return "<p>ERROR: Could not authorize</p>"

# fetch access and refresh tokens
@app.route("/auth/redirect")
def auth_redirect():
    #return "<p>Redirected!</p>"
    code = request.args.get('code')

    data = {
    'client_id': API_KEY,
    'client_secret': SECRET,
    'scope': 'CompanyFile',
    'code': code,
    'redirect_uri': REDIRECT_URI,
    'grant_type': 'authorization_code',
    'Content-Type': 'application/x-www-form-urlencoded'
    }

    tokens = requests.post(URL, data=data).json()
    json_tokens = json.dumps(tokens)
    f = open("./tokens.json","w")
    f.write(json_tokens)
    f.close()
    # return redirect('/redirect-home')
    return redirect('http://localhost:3000/responses')

@app.route("/redirect-home")
def capture():
    return '<p>Authorisation successful, redirected here after being authorised</p>'

@app.route("/post-feedback", methods=["GET", "POST"])
def post_feedback():
    query = get_query()
    response = requests.get(f'{COMPANY_FILE_URI}/Sale/Invoice/Item', headers=query)
    response_dict = json.loads(response.text)

    db = client.Forms # create a Forms database or switch to Forms database
    form_responses = db.form_responses # create a form_responses table or switch to form_responses table
    data = {}
    if request.method == "POST":
        date = dateutil.parser.parse(response_dict['Items'][0]['Date'])
        # keys in data['questions'] are determined by the name attribute in the html form - exact key-value pairs (i.e. customised forms) can be stored by using try-except around each key to check if the form has that key
        print(response_dict)
        data["questions"] = request.form
        data["order_number"] = '000000009'
        data["customer_name"] = "Nicholas Kondal"
        data['date_ordered'] =  date.strftime('%m/%d/%y  %I:%M%p')
        data["date_sent"] = '03/08/21  4:50PM'
        data["date_received"] = datetime.today().strftime('%d/%m/%y  %I:%M%p')
        form_responses.insert_one(data)

    return render_template("./thank_you.html")

@app.route("/insert-feedback", methods=["POST"])
def insert_feedback():
    data = request.json
    db = client.Forms
    form_responses = db.form_responses
    form_responses.insert(data)
    return "OK"


@app.route("/get-feedback", methods=["GET"])
def get_feedback():
    print("getting feedback")
    db = client.Forms # create a Forms database or switch to Forms database
    responseDict = []

    form_responses = db.form_responses # create a form_responses table or switch to form_responses table
    data_cursor = db.form_responses.find({})

    for feedback in data_cursor:
        feedback.pop("_id")
        responseDict.insert(0, feedback)
    return json.dumps(responseDict)

@app.route("/get-all-invoices")
def add_all_invoices_to_database():
    db = client.Invoices # create an Invoices database or switch to Invoices database
    invoices = db.invoices # create a invoices table or switch to invoices table

    query = get_query()
    if request.method == "GET":
        response = requests.get(f'{COMPANY_FILE_URI}/Sale/Invoice/Item', headers=query)

    data = {}
    data['all-invoices'] = response.text
    invoices.insert_one(data)
    return 'Invoices sent to database'

@app.route("/send-invoice-email") # NOT WORKING
def send_invoice_email():

    data = {
    'client_id': API_KEY,
    'client_secret': SECRET,
    'scope': 'CompanyFile',
    'redirect_uri': REDIRECT_URI,
    'grant_type': 'authorization_code',
    'Content-Type': 'application/x-www-form-urlencoded'
    }
    r = requests.post(f'{COMPANY_FILE_URI}/Sale/Invoice/Item/3365b09c-9784-453d-8c96-36c59ccc1bf9/Email', data=data)
    return r.text

@app.route("/send-email")
def send_email():

    msg = Message("Let us know how we did - Trust Us Plumbing Technicians", sender='trust.us.plumbers@gmail.com')
    msg.recipients = ["nicholas.kondal@gmail.com"]
    #msg.add_recipient("somebodyelse@example.com")
    msg.html = render_template('./form_template.html')
    mail.send(msg)

    return jsonify(message=f"Email sent to {msg.recipients}")

if __name__ == '__main__':
    app.run(debug = True)