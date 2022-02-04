# from django.contrib import admin
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from scrapeapi.views import (
    CollectionListView,
    CollectionView,
    ProductListView,
    ProductView,
    RegisterView
)

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='login_token'),
    path('api/register/', RegisterView.as_view(), name="register_user"),
    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/collections/', CollectionListView.as_view()),
    path('api/collections/<int:id>/', CollectionView.as_view()),
    path(
        'api/collections/<int:collection_id>/products/',
        ProductListView.as_view()
    ),
    path(
        'api/collections/<int:collection_id>/products/<int:id>',
        ProductView.as_view()
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)