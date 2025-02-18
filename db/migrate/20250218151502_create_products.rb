class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :upid
      t.string :brand
      t.string :name
      t.string :filidn
      t.integer :selling_price
      t.integer :price

      t.timestamps
    end
  end
end
