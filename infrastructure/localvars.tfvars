# elastic beanstalk
lv_eb_app_name          = "pikachu"
lv_eb_app_version_name  = "pikachu-version"
lv_eb_env_name          = "pikachu-env"
lv_platform             = "64bit Amazon Linux 2023 v4.0.1 running Docker"

# s3
lv_bucket_name      = "pikachu-aws-today"
lv_bucket_prefix    = "pikachu"
lv_key_file         = "Dockerfile"
lv_source_file      = "Dockerfile"

# iam
lv_role_name    = "beanstalk_role"
lv_policy       = "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier"
lv_profile_name = "beanstalk_iam_instance_profile"