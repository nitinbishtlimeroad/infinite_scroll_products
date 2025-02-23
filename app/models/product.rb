class Product < ApplicationRecord
    def image_url
      "https://n-img3.junaroad.com/uiproducts/#{upid}/zoom_0-#{fileidn}.jpg"
    end
  end
  