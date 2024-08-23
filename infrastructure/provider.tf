terraform {
    backend "s3" {
        bucket  = "terraform-backend"
        key     = "pikachu.tfstate"
        region  = "ap-southeast-1"
    }
}

provider "aws" {
  region = "ap-southeast-1"
}