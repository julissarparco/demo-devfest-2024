#!/bin/bash

cat <<EOF > variables.tfvars
gemini_api_key = "${GEMINI_API_KEY}"
gemini_api_key_secret = "${GEMINI_API_KEY_SECRET}"
project_id = "${PROJECT_ID}"
region = "${REGION}"
source_archive_object = "${SOURCE_ARCHIVE_OBJECT}"
EOF

echo "Terraform variables file created:"
cat variables.tfvars