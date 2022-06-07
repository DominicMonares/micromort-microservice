import sys, json

def read_in():
  lines = sys.stdin.readlines()
  return json.loads(lines[0])

def main():
  lines = read_in()
  commuter_id = lines['commuterID']
  if commuter_id == 'COM-1':
    print(10)
  elif commuter_id == 'COM-42':
    print(105124)
  elif commuter_id == 'COM-64':
    print(90)
  else:
    print(7357)

if __name__ == '__main__':
  main()