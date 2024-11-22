provider "google" {
  project = var.project_id
  region  = var.region
}

module "storage" {
  source      = "./modules/storage"
  bucket_name = "${var.project_id}-functions"
  region      = var.region
  project_id  = var.project_id
}

module "cloud_function" {
  source                = "./modules/cloud_function"
  project_id            = var.project_id
  region                = var.region
  source_archive_bucket = module.storage.bucket_name
  source_archive_object = var.source_archive_object
  gemini_api_key_secret = "projects/${var.project_id}/secrets/${module.secret_manager.secret_id}/versions/latest"
}

module "secret_manager" {
  source         = "./modules/secret_manager"
  project_id     = var.project_id
  secret_name    = var.gemini_api_key_secret
  gemini_api_key = var.gemini_api_key
}
