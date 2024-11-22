output "function_url" {
  value = "https://${module.cloud_function.https_trigger_url}"
}

output "bucket_name" {
  value = module.storage.bucket_name
}
