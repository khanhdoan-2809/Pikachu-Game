resource "aws_iam_role" "beanstalk_service" {
  name = var.mv_role_name

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": [
                    "ec2.amazonaws.com"
                ]
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "beanstalk_log_attach" {
  role       = aws_iam_role.beanstalk_service.name
  policy_arn = var.mv_policy
}

resource "aws_iam_instance_profile" "beanstalk_iam_instance_profile" {
  name = var.mv_profile_name
  role = aws_iam_role.beanstalk_service.name
}