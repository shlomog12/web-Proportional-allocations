from flask import render_template, request
from flask_files import app
import json

@app.route('/')
def input():
  return  render_template('input.html')


@app.route('/output', methods=['POST'])
def output():
  data = request.form['input_data']
  res = json.loads(data)
  print(res['שחקן 0'])
  return render_template('output.html', data=res)