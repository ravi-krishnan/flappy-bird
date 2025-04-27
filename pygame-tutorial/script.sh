#!/bin/bash
set -e 

if [ ! -d "venv" ]; then
    python -m venv venv
fi 

source venv/bin/activate
echo  "venv activated"

pip install -r requirements.txt
echo "change"
python  main.py

