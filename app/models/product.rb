class Product < ApplicationRecord
    def image_url
      return nil if upid.blank? || fileidn.blank? # Avoid broken images
  
      "https://n-img3.junaroad.com/uiproducts/#{upid}/zoom_0-#{fileidn}.jpg"
    end
  end
  