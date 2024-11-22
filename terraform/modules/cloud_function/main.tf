resource "google_cloudfunctions_function" "sarcastic_response" {
  name        = "sarcastic-response"
  runtime     = "nodejs18"
  entry_point = "sarcasticApp"

  source_archive_bucket = var.source_archive_bucket
  source_archive_object = var.source_archive_object

  trigger_http = true

  environment_variables = {
    GCP_PROJECT_ID = var.project_id
    GEMINI_API_KEY = var.gemini_api_key_secret
  }
}

resource "google_cloudfunctions_function_iam_member" "public_invoker" {
  project        = var.project_id
  region         = var.region
  cloud_function = google_cloudfunctions_function.sarcastic_response.name
  role           = "roles/cloudfunctions.invoker"
  member         = "allUsers"
  depends_on     = [google_cloudfunctions_function.sarcastic_response]
}
