import json

from datetime import datetime, timedelta
from django.utils.dateparse import parse_datetime
from rest_framework import generics, permissions, response, status
from rest_framework.authentication import SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import unicodecsv as csv

from upload.utils import get_delimiter, get_file_encoding
from tasks.models import Task


class RecheckFileView(generics.GenericAPIView):
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = request.data.get(u'file', None)
        file_delimiter = get_delimiter(request.data.get(u'file_delimiter', None), file)
        file_charset = get_file_encoding(file, request.data.get(u'file_charset', None))

        headers = csv.reader(file, encoding=file_charset, delimiter=file_delimiter).next()

        return response.Response(data={
            u'headers': headers,
            u'delimiter': file_delimiter,
            u'encoding': file_charset
        }, status=status.HTTP_200_OK)


class PreviewGenerator(object):
    @staticmethod
    def generate(reader, mapping):
        for i, row in enumerate(reader):
            label_key = mapping.get(u'label', None)

            if not row or not label_key or not row.get(label_key, None):
                continue

            description_key = mapping.get(u'description', None)
            dev_eta_key = mapping.get(u'dev_eta', None)
            dev_eta = datetime.now() + timedelta(days=7)

            if dev_eta_key and row.get(dev_eta_key):
                try:
                    parsed_date = parse_datetime(row.get(dev_eta_key))
                    if parsed_date:
                        dev_eta = parsed_date
                except Exception:
                    pass

            yield {
                u'label': row.get(label_key),
                u'description': row.get(description_key, None) if description_key else None,
                u'dev_eta': dev_eta.strftime('%Y-%m-%d')
            }


class GeneratePreviewView(generics.GenericAPIView, PreviewGenerator):
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = request.data.get(u'file', None)
        delimiter = str(request.data.get('delimiter', None))
        encoding = request.data.get(u'encoding', None)

        if request.data.get(u'mapping'):
            mapping = json.loads(request.data.get(u'mapping'))
        else:
            mapping = dict()

        headers = csv.reader(file.replace(u'\0', u''), encoding=encoding, delimiter=delimiter).next()

        reader = csv.DictReader(file.replace(u'\0', u''), fieldnames=headers, encoding=encoding, delimiter=delimiter)

        result = []
        for v in self.generate(reader, mapping):
            result.append(v)

        return response.Response(data=result, status=status.HTTP_200_OK)


class ImportView(generics.GenericAPIView, PreviewGenerator):
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        file = request.data.get(u'file', None)
        delimiter = str(request.data.get('delimiter', None))
        encoding = request.data.get(u'encoding', None)

        if request.data.get(u'mapping'):
            mapping = json.loads(request.data.get(u'mapping'))
        else:
            mapping = dict()

        headers = csv.reader(file.replace(u'\0', u''), encoding=encoding, delimiter=delimiter).next()

        reader = csv.DictReader(file.replace(u'\0', u''), fieldnames=headers, encoding=encoding, delimiter=delimiter)

        records = []
        for v in self.generate(reader, mapping):
            record = Task(label=v[u'label'], description=v[u'description'], dev_eta=v[u'dev_eta'])
            records.append(record)

            if len(records) == 1500:
                Task.objects.bulk_create(records)
                records = []

        if len(records) > 0:
            Task.objects.bulk_create(records)

        return response.Response(status=status.HTTP_201_CREATED)
