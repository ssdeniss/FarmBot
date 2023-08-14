#!/bin/sh
env > env_file

echo "window._env_ = {"
while read -r line || [[ -n "$line" ]];
do
  if printf '%s\n' "$line" | grep -q -e "REACT_APP_"; then
    varname=$(printf '%s' "$line" | sed -e 's/=.*//')
    value=$(printenv ${varname})
    echo "  ${varname/REACT_APP_/}: \"$value\","
  fi
done < env_file

rm -rf env_file

echo "}"