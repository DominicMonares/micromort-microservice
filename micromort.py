import sys, json

def read_input():
  lines = sys.stdin.readlines()
  return json.loads(lines)

def main():
  lines = read_input()
  print('PYTHON TEST SUCCESS')

if __name__ == '__main__':
  main()