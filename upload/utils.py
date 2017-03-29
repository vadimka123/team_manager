import csv
import chardet


def get_file_encoding(file, encoding):
    if encoding != u'auto':
        return encoding

    try:
        result = chardet.detect(file.read(4))
        return result[u'encoding']
    except:
        return u'utf-8'


def get_delimiter(delimiter_word, fp):
    delimiter_map = {
        u'comma': ',',
        u'tab': '\t',
        u'semicolon': ';'
    }

    if delimiter_word != U'auto':
        return delimiter_map[delimiter_word]

    delimiter = delimiter_map[u'comma']

    try:
        delimiter = csv.Sniffer().sniff(fp.readline(), delimiters=u";,\t").delimiter
    except csv.Error:
        pass
    fp.seek(0)
    return delimiter
