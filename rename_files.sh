#!/bin/bash

DIRECTORY="/data/music"

replace_spaces() {
  for FILE in "$1"/*; do
    # Check if the file or directory exists
    if [[ -e "$FILE" ]]; then

      NEW_FILE=$(echo "$FILE" |
        tr ' ' '_' |
        sed -E 's/\[[^]]*\]//g' |
        sed -E 's/\([^)]*\)//g' |
        sed -E 's/-/_/g' |
        sed -E 's/ä|Ä/ae/g' |
        sed -E 's/ö|Ö/oe/g' |
        sed -E 's/ü|Ü/ue/g' |
        sed -E 's/ß/ss/g' |
        sed -E 's/__/_/g' |
        sed -E 's/_$//' |
        tr '[:upper:]' '[:lower:]')

      # If the name needs to be changed
      if [[ "$FILE" != "$NEW_FILE" ]]; then
        mv "$FILE" "$NEW_FILE"
        echo "Umbenannt: '$FILE' -> '$NEW_FILE'"
        FILE="$NEW_FILE" # Update FILE if the name has been changed
      fi

      # Recursive call, if it is a directory
      if [[ -d "$FILE" ]]; then
        replace_spaces "$FILE"
      fi
    fi
  done
}

# Start of processing
replace_spaces "$DIRECTORY"

echo "All files in the directory have been processed."
