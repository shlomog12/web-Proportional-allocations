from flask import render_template, request
from flask_files import app
import json
from flask_files.proportional_borda_allocations import proportional_division, proportional_division_equal_number_of_items_and_players
from fairpy import AgentList

@app.route('/')
def input():
  return  render_template('input.html')


@app.route('/output', methods=['POST'])
def output():
  data = request.form['input_data']
  agents = AgentList(json.loads(data))
  if (len(agents) == len(agents.all_items())):
    allocation = proportional_division_equal_number_of_items_and_players(agents)
  else:
    allocation = proportional_division(agents)
  if not allocation:
    return render_template('output.html', agents=None)
  bundles = allocation.bundles
  agents_retults = []
  for i in range(len(agents)):
    cur_agent = agents[i]
    agents_retults.append(
      {
        'name': cur_agent._name,
        'all_items': bundles[i],
        'total_value': cur_agent.value(bundles[i]),
      }
    )
  return render_template('output.html', agents=agents_retults)

     