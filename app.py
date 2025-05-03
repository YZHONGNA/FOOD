from flask import Flask, render_template, redirect, url_for, session, flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
import bcrypt
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'mydatabase'
app.secret_key = 'your_secret_key'

mysql = MySQL(app)

class RegisterForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    role = StringField("Role", validators=[DataRequired()])  # 'user', 'volunteer', or 'admin'
    submit = SubmitField("Register")
    
    def validate_email(self, field):
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email=%s", (field.data,))
        user = cursor.fetchone()
        cursor.close()
        if user:
            raise ValidationError('Email already taken')
        
        user = cursor
        
    
class LoginForm(FlaskForm):
    email = StringField("Email",validators=[DataRequired(),Email()])
    password = PasswordField("Password",validators=[DataRequired()])
    submit = SubmitField("Login")
class RequestForm(FlaskForm):
    request_type = StringField("Request Type", validators=[DataRequired()])  # 'food', 'safety', 'volunteer', 'membership'
    description = StringField("Description", validators=[DataRequired()])
    urgency = StringField("Urgency")  # 'low', 'medium', 'high'
    submit = SubmitField("Submit Request")

@app.route("/")
def index():
    return 'render_template('index.html')
    
@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        password = form.password.data
	role = form.role.data
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)", (name, email, hashed_password, role))
        mysql.connection.commit()
        cursor.close()
	flash("Registration successful! Please login.")
        return redirect(url_for('login'))
    return render_template('register.html', form=form)
    
@app.route("/login",methods=['GET','POST'])
def login():
    from = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        
        cursor = mysql.connection.cursor()
        cursor.execute("Select * FROM users WHERE email=%s",(email,))
        user = cursor.fetchone()
        cursor.close()
        if user and bcrypt.checkpw(password.encode('utf-8',user[3].encode('utf-8'))
            session['user_id'] = user[0]
	    session['user_role'] = user[4]
            return redirect(url_for('Dashboard'))
        else:
            flash("Login failed. Please check your email and password")
            return redirect(url_for('login'))
    return 'render_template('login.html', form=form)


@app.route("/Dashboard")
def Dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    user_id = session['user_id']
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE id=%s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
        
     if user:
        cursor = mysql.connection.cursor()
        if session['user_role'] == 'admin':
            cursor.execute("SELECT * FROM requests")
        elif session['user_role'] == 'volunteer':
            cursor.execute("SELECT * FROM requests WHERE status='pending'")
        else:
            cursor.execute("SELECT * FROM requests WHERE user_id=%s", (user_id,))
        requests = cursor.fetchall()
        cursor.close()
        
        return render_template('Dashboard.html', user=user, requests=requests)
    return redirect(url_for('login'))
@app.route("/create_request", methods=['GET', 'POST'])
def create_request():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    form = RequestForm()
    if form.validate_on_submit():
        user_id = session['user_id']
        request_type = form.request_type.data
        description = form.description.data
        urgency = form.urgency.data or 'medium'
        
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO requests (user_id, request_type, description, urgency, status) VALUES (%s, %s, %s, %s, 'pending')", 
                      (user_id, request_type, description, urgency))
        mysql.connection.commit()
        cursor.close()
        
        flash("Request submitted successfully!")
        return redirect(url_for('dashboard'))
    return render_template('create_request.html', form=form)

@app.route("/update_request/<int:request_id>", methods=['POST'])
def update_request(request_id):
    if 'user_id' not in session or session['user_role'] not in ['admin', 'volunteer']:
        return redirect(url_for('login'))
    
    new_status = request.form.get('status')
    if new_status in ['pending', 'in_progress', 'completed']:
        cursor = mysql.connection.cursor()
        cursor.execute("UPDATE requests SET status=%s WHERE id=%s", (new_status, request_id))
        mysql.connection.commit()
        cursor.close()
        flash("Request status updated!")
    return redirect(url_for('dashboard'))
    
@app.route("/logout")
def logout
    session.pop('user_id', None)
    flash("Your have been logout")
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)