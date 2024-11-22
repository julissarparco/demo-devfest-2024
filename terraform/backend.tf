terraform {
  backend "gcs" {
    bucket = "dev-fest-2024-terraform-state"
    prefix = "terraform/state"
  }
}
