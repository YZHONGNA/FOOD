@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or not all(key in data for key in ['username', 'email', 'password']):
        return jsonify({'success': False, 'message': 'Missing required fields'}), 400
    
    username = data['username']
    email = data['email']
    password = data['password']

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor = mysql.connection.cursor()

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'Email already registered'}), 400

         cursor.execute(
            "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, 'user')",
            (username, email, hashed_password)
        )
        mysql.connection.commit()

        user_id = cursor.lastrowid

        cursor.close()

        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'user': {
                'id': user_id,
                'name': username,
                'email': email,
                'role': 'user'
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not all(key in data for key in ['email', 'password']):
        return jsonify({'success': False, 'message': 'Missing email or password'}), 400
    
    email = data['email']
    password = data['password']
    
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
            session['user_id'] = user[0]
            session['user_role'] = user[4]
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'id': user[0],
                    'name': user[1],
                    'email': user[2],
                    'role': user[4]
                }
            })
        else:
            return jsonify({'success': False, 'message': 'Invalid email or password'}), 401
            
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
