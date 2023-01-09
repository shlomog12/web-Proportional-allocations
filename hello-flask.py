from flask import Flask, render_template
# app = Flask(__name__, static_url_path='',static_folder='./client')
app = Flask(__name__)


@app.route('/')
def hello_flask1():
  return  render_template('./index3.html')


# @app.route('/')
# def hello_flask1():
#     with open(file='./index.html') as f:
#         x = f.flush()
#         return x

# @app.route('/dddd')
# def hello_flask2():
#     return 'hello Shlomo d123'


if __name__ == '__main__':
    app.run(debug=True)