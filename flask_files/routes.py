from flask import render_template, request
from flask_files import app

@app.route('/')
def input():
  return  render_template('input.html')


@app.route('/output', methods=['POST'])
def output():
  data = request.form['input_data']
  print(data)
  return render_template('output.html', data=data)