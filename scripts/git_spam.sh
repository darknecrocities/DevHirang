#!/bin/bash

# Navigate to project root
cd "$(dirname "$0")/.."

echo "Backing up README.md..."
cp README.md README.md.bak

echo "Starting 1000 commits..."

for i in {1..1000}
do
    echo "Iteration $i/1000"
    echo -n " " >> README.md
    git add README.md
    git commit -m "commit"
    git push origin main
    
    # Optional: add a small sleep to avoid hitting rate limits too fast if needed, 
    # but the user said "do it", so I'll go full speed unless it fails.
done

echo "Restoring original README.md..."
mv README.md.bak README.md
git add README.md
git commit -m "Final restore to original state"
git push origin main

echo "Done!"
