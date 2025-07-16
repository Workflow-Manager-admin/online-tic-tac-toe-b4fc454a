#!/bin/bash
cd /home/kavia/workspace/code-generation/online-tic-tac-toe-b4fc454a/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

