variable "project_id" {
  description = "The project ID to deploy resources"
}

variable "region" {
  description = "The region to deploy resources"
}

variable "gemini_api_key" {
  description = "The Gemini API key"
}

variable "gemini_api_key_secret" {
  description = "The secret name for the Gemini API key"
  default     = "gemini-api-key"
}

variable "source_archive_object" {
  description = "The name of the source archive object"
  default     = "sarcastic-function.zip"
}
