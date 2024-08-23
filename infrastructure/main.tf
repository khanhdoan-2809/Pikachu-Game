module "eb" { 
    source            = "./modules/eb"
    mv_bucket                  = module.s3.bucket_id
    mv_eb_app_name             = var.lv_eb_app_name
    mv_eb_app_version_name     = var.lv_eb_app_version_name
    mv_eb_env_name             = var.lv_eb_env_name
    mv_object_key              = module.s3.object_id
    mv_platform                = var.lv_platform
    mv_instance_profile        = module.iam.profile_name
}

module "s3" {
    source            = "./modules/s3"
    mv_bucket_prefix = var.lv_bucket_prefix
    mv_key_file      = var.lv_key_file
    mv_source_file   = var.lv_source_file
}

module "iam" {
    source = "./modules/iam"
    mv_policy       = var.lv_policy
    mv_profile_name = var.lv_profile_name
    mv_role_name    = var.lv_role_name
}