require 'json'

file = File.read(Rails.root.join('db', 'products.json'))
products = JSON.parse(file)

products.each do |product|
  Product.find_or_create_by!(upid: product["id"]) do |p|
    p.brand = product["brand"]
    p.name = product["name"]
    p.fileidn = product["fileidn"]
    p.selling_price = product["selling_price"]
    p.price = product["price"]
  end
end

puts "Products successfully seeded!"