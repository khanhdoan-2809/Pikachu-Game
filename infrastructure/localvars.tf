// elastic beanstalk
variable "lv_eb_app_name" {
    type = string  
}

variable "lv_eb_app_version_name" {
    type = string
}

variable "lv_application" {
    type = string
}

variable "lv_bucket" {
    type = string
}

variable "lv_object_key" {
  
}

variable "lv_eb_env_name" {
    type = string
}

variable "lv_platform" {
    type = string
}

// s3
variable "lv_bucket_prefix" {
    type = string
}

variable "lv_bucket_name" {
    type = string
}

variable "lv_key_file" {
    type = string
}

variable "lv_source_file" {
    type = string  
}

// iam
variable "lv_role_name" {
    type = string    
}

variable "lv_policy" {
    type = string
}

variable "lv_profile_name" {
    type = string
}