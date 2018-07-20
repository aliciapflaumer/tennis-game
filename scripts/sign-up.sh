curl "/sign-up" \
  --include \
  --request POST \
  --header "Content-type: application/json" \
  --data '{
    "credentials": {
    "username": "'"${USERNAME}"'",
    "password": "'"${PASSWORD}"'",
    "password_confirmation": "'"${PASSWORD}"'"
    }
  }'
echo
