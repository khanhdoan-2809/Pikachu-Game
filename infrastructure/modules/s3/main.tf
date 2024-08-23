resource "aws_s3_bucket" "pikachu" {
  bucket = "${var.mv_bucket_prefix}-${random_pet.petname.id}}"
}

resource "aws_s3_object" "pikachu" {
  bucket = aws_s3_bucket.pikachu.id
  key    = var.mv_key_file
  source = var.mv_source_file
}
