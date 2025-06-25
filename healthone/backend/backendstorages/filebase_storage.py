from storages.backends.s3boto3 import S3Boto3Storage
from botocore.config import Config
import boto3
from django.conf import settings

class FilebaseStorage(S3Boto3Storage):
    bucket_name = settings.FILEBASE_BUCKET_NAME
    endpoint_url = 'https://s3.filebase.com'

    def generate_presigned_url(self, key, expires_in=3600):
        client = boto3.client(
            's3',
            endpoint_url=self.endpoint_url,
            aws_access_key_id=settings.FILEBASE_ACCESS_KEY,
            aws_secret_access_key=settings.FILEBASE_SECRET_KEY,
            config=Config(signature_version='s3v4', s3={'addressing_style': 'path'})
        )
        return client.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket_name, 'Key': key},
            ExpiresIn=expires_in,
        )
