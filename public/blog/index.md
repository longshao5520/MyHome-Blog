# Django Blog
## 在项目根目录创建虚拟环境
```
安装virtualenv
longdeMac-mini:~ long$ sudo pip3 install virtualenv
创建virtualenv虚拟环境
longdeMac-mini:Blog long$ virtualenv --no-site-packages venv
进入virtualenv环境
longdeMac-mini:Blog long$ source venv/bin/activate
安装Django
(venv) longdeMac-mini:Blog long$ pip3 install Django==2.1.4
退出当前virtualenv环境
(venv) longdeMac-mini:Blog long$ deactivate
longdeMac-mini:Blog long$ 
```
## 创建Blog项目
打开pycharm，点击Create New Project，选择Django项目
设置Location为`/Users/long/Documents/Django/Blog/Blog_project`，虚拟环境选择Existing interpreter，Interpreter指定为刚刚创建的虚拟环境`/Users/long/Documents/Django/Blog/venv/bin/python3.7`
Application name为Blog，然后点击Create
## 安装库和依赖
```
虚拟环境中安装
pip3 install pymysql
pip3 install pillow
```
## 设置静态文件目录
在settings.py文件的最后添加
```
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
```
## 设置默认路由
在views.py中创建路由函数
```
def index(request):
    return render(request, 'index.html', locals())
```
在urls.py中引用并设置
```
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from Blog.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', index, name='index'),
]
```

可以在settings.py中定义一些站点所用的一些参数，然后定义到urls.py的一个方法中，再然后将这个方法添加到settings.py中TEMPLATES的OPTIONS中去，就能够实现在整个网站中都能够直接使用这些参数。

```
# settings.py
SITE_NAME = "某某某的博客"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'Blog.views.global_setting'
            ],
        },
    },
]


#urls.py
from django.conf import settings
def global_setting(request):
    return {'SITE_NAME' = settings. SITE_NAME}
```



