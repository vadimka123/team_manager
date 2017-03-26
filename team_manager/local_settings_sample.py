_YOUR_SETTING_ = ''

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': _YOUR_SETTING_,
        'USER': _YOUR_SETTING_,
        'PASSWORD': _YOUR_SETTING_,

    },
}

DEBUG = True
ALLOWED_HOSTS = ['*']

# should match one in your /etc/hosts file. Example value: 'http://team_manager.local.com'
BASE_URI = _YOUR_SETTING_
