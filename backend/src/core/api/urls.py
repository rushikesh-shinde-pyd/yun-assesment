from django.urls import path, include
from .import views


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/item-list/', views.ItemList.as_view(), name="item-list"),
    path('api/item-list/<str:name>/', views.ItemDetail.as_view(), name="item-detail")
]

