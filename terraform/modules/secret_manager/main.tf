resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = var.secret_name

  replication {
    auto {}
  }
}
resource "google_secret_manager_secret_version" "gemini_api_key_version" {
  secret      = google_secret_manager_secret.gemini_api_key.id
  secret_data = var.gemini_api_key
}
