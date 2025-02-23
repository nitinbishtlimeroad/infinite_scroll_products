class ProductsController < ApplicationController
  def index
    pgid = params[:pgid].to_i
    pgid = 1 if pgid < 1
    offset = (pgid - 1) * 8
    @products = Product.offset(offset).limit(8)
  end

  def load_more
    offset = params[:offset].to_i
    @products = Product.offset(offset).limit(8)

    if @products.any?
      render partial: 'products/product', collection: @products, layout: false
    else
      head :no_content  # 204 response when no more products
    end
  end
end
