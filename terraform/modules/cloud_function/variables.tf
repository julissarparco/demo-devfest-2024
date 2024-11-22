variable "project_id" {
  description = "The project ID to deploy resources"
  type        = string
}

variable "region" {
  description = "The region to deploy resources"
  type        = string
}

variable "source_archive_bucket" {
  description = "Name of the bucket where the source code is stored"
  type        = string
}

variable "source_archive_object" {
  description = "Name of the object in the bucket where the source code is stored"
  type        = string
}

variable "gemini_api_key_secret" {
  description = "The secret name for the Gemini API key"
  type        = string
}
