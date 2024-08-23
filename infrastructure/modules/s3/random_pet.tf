# Define a unique randon name for the S3 bucket
resource "random_pet" "petname" {
  separator = "-"
  length    = 1
}