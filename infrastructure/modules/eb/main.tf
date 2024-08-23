resource "aws_elastic_beanstalk_application" "pikachu" {
  name        = var.mv_eb_app_name
  description = "Elastic Beanstlak app for 2048"
}

resource "aws_elastic_beanstalk_application_version" "pikachu" {
  name        = var.mv_eb_app_version_name
  application = aws_elastic_beanstalk_application.pikachu.name
  description = "application version"
  bucket      = var.mv_bucket
  key         = var.mv_object_key
}

resource "aws_elastic_beanstalk_environment" "env-2048" {
  name                = var.mv_eb_env_name
  application         = aws_elastic_beanstalk_application.pikachu.name
  solution_stack_name = var.mv_platform
  version_label       = aws_elastic_beanstalk_application_version.pikachu.name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = var.mv_instance_profile
  }
}